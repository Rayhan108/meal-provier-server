import AppError from '../../errors/AppError';

import httpStatus from 'http-status';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';

import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import confiq from '../../app/confiq';
import { TUser } from '../User/user.interface';
import { UserModel } from '../User/user.model';
// register new user
const registeredUserIntoDB = async (payload: TUser) => {
  // console.log(payload);
  const user = await UserModel.isUserExistsByEmail(payload.email);
  // console.log(user);
  if (user) {
    throw new AppError(httpStatus.CONFLICT, 'This user is already exists!');
  }
 
  // console.log(newUser);
  const result = await UserModel.create(payload);
  return result;
};
// login user
const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByEmail(payload.email);
  // console.log('login user',user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Credentials!');
  }
  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    confiq.jwt_access_secret as string,
    confiq.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    confiq.jwt_refresh_secret as string,
    confiq.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// change password api
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistsById(userData.userId);
  //   console.log('change pass user',user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct

  if (!(await UserModel.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(confiq.bcrypt_salt_rounds),
  );
  //   console.log('user data chnge pass 78 line',userData);
  await UserModel.findOneAndUpdate(
    {
      _id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );
  //   console.log('pass change 89 line',result);
  return null;
};

// refresh token

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, confiq.jwt_refresh_secret as string);

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await UserModel.isUserExistsById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    UserModel.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    confiq.jwt_access_secret as string,
    confiq.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registeredUserIntoDB,
  loginUser,
  changePassword,
  refreshToken,
};
