import { Document, Types } from "mongoose";


export interface IMenu extends Document {

    mealName: string;
    availability: 'italian' | 'vegan' | 'indian' | 'mexican' | 'chinese' | 'mediterranean';
    cuisineType: string;
    price: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  