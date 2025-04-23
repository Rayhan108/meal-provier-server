/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { OrderServices } from "./order.services";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { IUser, TUser } from "../User/user.interface";



//create an order
const createOrder =  async (req: Request, res: Response,next:NextFunction) =>{
 try{
  const user = req.user as IUser

    const result = await OrderServices.createOrderIntoDB(user, req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Order Created succesfully!',
        data: result,
      });
 }catch (err: any) {
    
  next(err)
  }

}



//get all orders
const getAllOrders=catchAsync(async(req:Request,res:Response)=>{
    const result = await OrderServices.getAllOrderFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order are retrived succesfully!',
        data: result,
      });
})
//get Single orders
const getSingleOrders=catchAsync(async(req:Request,res:Response)=>{
  const {id }= req.params;
    const result = await OrderServices.getSingleOrder(id);
    console.log(result,"<==order");
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order are retrived succesfully!',
        data: result,
      });
})

export const OrderController={
    createOrder,
getAllOrders,

    getSingleOrders
}