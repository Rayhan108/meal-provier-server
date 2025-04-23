
import AppError from "../../errors/AppError";


import httpStatus from "http-status";
import { OrderModel } from "./order.model";


import { UserModel } from "../User/user.model";
import { IUser, TUser } from "../User/user.interface";

//create an order

const createOrderIntoDB = async (
    customer:IUser,
    payload: { meal: string; dietary?: string[] }
  ) => {
    // Validate payload
    if (!payload?.meal) {
      throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Meal must be specified');
    }
  console.log("user=>",customer);
    // Fetch the customer from DB
    const userData = await UserModel.findById(customer.userId);
    if (!userData) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
  
    // Create order
    const order = await OrderModel.create({
      meal: payload.meal,
      dietary: payload.dietary || [],
      customerId: userData._id,
      status: 'pending',
    });
  
    return order;
  };




// get all orders
const getAllOrderFromDB=async()=>{
    const result = await OrderModel.find();
    return result;
}
// get each user order
const getSingleOrder=async(id:string)=>{
  const userOrders = await OrderModel.find({ _id: id }).populate({
    path: "meal",

  });
console.log("order=>",userOrders);

    return userOrders;
}





export const OrderServices = {
  createOrderIntoDB,

  getAllOrderFromDB,

  getSingleOrder
};
