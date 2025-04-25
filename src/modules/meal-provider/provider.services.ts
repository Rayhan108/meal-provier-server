
import AppError from "../../errors/AppError";


import httpStatus from "http-status";



import { UserModel } from "../User/user.model";
import { IUser, TUser } from "../User/user.interface";
import { IMenu } from "./provider.interface";
import { ProviderModel } from "./provider.model";
import { OrderModel } from "../Order/order.model";

//create an order api

const createMenuIntoDB = async (
    provider:IUser,
    payload:IMenu 
  ) => {

  console.log("user=>",provider);
    // Fetch the customer from DB
    const userData = await UserModel.findById(provider.userId);
    if (!userData) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
  
    // Create order
    const menu = await ProviderModel.create(payload);
  
    return menu ;
  };




// get all orders
const getAllOrderFromDB=async()=>{
    const result = await OrderModel.find();
    return result;
}
// get all menu
const getAllMenuFromDB=async()=>{
    const result = await ProviderModel.find();
    return result;
}





export const menuServices = {
createMenuIntoDB,
  getAllOrderFromDB,
getAllMenuFromDB
};
