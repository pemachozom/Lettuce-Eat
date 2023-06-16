const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductRecord',
    required: true
  }],
  status:{
    type:String,
    default:"pending"
  },
  paymentStatus:{
    type:String,
    default:"notPayed"
  },
  jrnlNo:{
    type:String,
    default:""
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
