import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";



const orderSchema = new Schema<IOrder>(
  {
    meal: {
      type: String,
      required: true,
    },
    dietary: {
      type: [String],
      default: [],
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = model<IOrder>("Order", orderSchema);
