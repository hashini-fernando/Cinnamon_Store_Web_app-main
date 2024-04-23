import {model , Schema } from "mongoose";

export const ProductSchema = new Schema(
    {
      productid :{type: String,required:true},
      name: { type: String, required: true },
      volume: { type: String, required: true },
      price: { type: Number, required: true },
      favorite: { type: Boolean, default: false },
      stars: { type: Number, default: 3 },
      imageUrl: { type: String, required: true },
      description : {type: String, required: true },
      tag:{type:String,required: true}
      
      
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
  
  export const ProductModel =  model ('product', ProductSchema);