import {model , Schema } from "mongoose";

export const cartItemSchema = new Schema(
    {
      productid :{type: String,required:true},
      
      quantity:{type:Number,required: true}
      
      
    },


    {
      toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
      timestamps: true,
    }
  );
  
  export const CartItemModel =  model ('CartItem', cartItemSchema);
