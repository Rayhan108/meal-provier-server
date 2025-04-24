import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
      email: z.string({ required_error: 'email is required.' }),
      password: z.string({ required_error: 'Password is required' }),
    }),
  });
  const registerUserValidationSchema = z.object({
    body: z.object({

        name: z.string().trim().min(1, "Name is required"),
        email: z.string().trim().email("Invalid email address"),
        image: z.string().trim().optional(),
        password: z.string().trim(),
        phone:z.string(),
        role: z.enum(["customer", "mealProvider"]).default("customer"),
        createdAt: z.date().default(() => new Date()),
        updatedAt: z.date().default(() => new Date()),
    })
})
  const updateUserValidationSchema = z.object({
    body: z.object({

        name: z.string().trim().optional(),
        email: z.string().trim().email("Invalid email address").optional(),
        image: z.string().trim().optional(),
        password: z.string().trim().optional(),
        phone:z.string().optional(),
        role: z.enum(["customer", "mealProvider"]).default("customer").optional(),
        
    })
})
const changePasswordValidationSchema = z.object({
    body: z.object({
      oldPassword: z.string({
        required_error: 'Old password is required',
      }),
      newPassword: z.string({ required_error: 'Password is required' }),
    }),
  });
  const refreshTokenValidationSchema = z.object({

    cookie: z.object({
      refreshToken: z.string({
        required_error: 'Refresh token is required!',
      }),
    }),
  });
export const AuthValidation = {loginValidationSchema,registerUserValidationSchema,changePasswordValidationSchema,refreshTokenValidationSchema,updateUserValidationSchema}