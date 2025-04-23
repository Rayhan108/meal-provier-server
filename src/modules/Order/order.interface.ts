import { Document, Types } from "mongoose";


export interface IOrder extends Document {
    meal: string;
    
    dietary?: string[]; 
    customerId?: string;
    status?: 'pending' | 'in_progress' | 'delivered'; 
   
    createdAt?: Date;
    updatedAt?: Date;
  }
  