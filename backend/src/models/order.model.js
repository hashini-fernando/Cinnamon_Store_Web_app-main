import { model, Schema } from 'mongoose';

export const OrderItemSchema = new Schema(
  {
    product: { type: Object, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

OrderItemSchema.pre('validate', function (next) {
  this.price = this.product.price * this.quantity;
  next();
});

export const OrderStatus = {
  NEW: 'NEW',
  PAYED: 'PAYED',
  SHIPPED: 'SHIPPED',
  CANCELED: 'CANCELED',
  REFUNDED: 'REFUNDED',
};

const paymentSchema = new Schema({
  cardname: {
    type: String,
    required: true,
    minlength: 13,
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
  },
  expiryDate: {
    type: String,
    required: true,
    minlength: 5,
  },
  cvv: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    minlength: 10,
  },
});

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    payment: { type: paymentSchema }, 
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.NEW },
    user: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const OrderModel = model('order', orderSchema);
