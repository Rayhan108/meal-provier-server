import { model, Schema } from "mongoose";

import { IMenu } from "./provider.interface";



const menuSchema = new Schema<IMenu>(
  {
    mealName: {
      type: String,
      required: true,
    },
    cuisineType: {
      type: String,
      enum: ["italian", "vegan", "indian", "mexican", "chinese", "mediterranean"]
    },
  
    price: {
      type: String,
      
    },
  
    availability: {
      type: String,
      enum: ["in stock", "out of stock"],
    
    },
  },
  {
    timestamps: true,
  }
);

export const ProviderModel = model<IMenu>("Provider", menuSchema);
