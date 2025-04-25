/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { IUser, TUser } from "../User/user.interface";
import { menuServices } from "./provider.services";



//create an order
const createMenu =  async (req: Request, res: Response,next:NextFunction) =>{
 try{
  const user = req.user as IUser

    const result = await menuServices.createMenuIntoDB(user, req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Menu Created succesfully!',
        data: result,
      });
 }catch (err: any) {
    
  next(err)
  }

}



//get all orders
const getAllOrders=catchAsync(async(req:Request,res:Response)=>{
    const result = await menuServices.getAllOrderFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order are retrived succesfully!',
        data: result,
      });
})
//get all menu
const getAllMunu=catchAsync(async(req:Request,res:Response)=>{
    const result = await menuServices.getAllMenuFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order are retrived succesfully!',
        data: result,
      });
})





export const providerController={
createMenu,
getAllOrders,
getAllMunu

}