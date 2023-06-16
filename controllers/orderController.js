const Order = require("./../models/ordersModel")
exports.createOrder = async(req, res) => {
  const { userId, total, productIds } = req.body;
  try {
    const order = await Order.create({ userId, total, productIds });
    res.status(201).json({ order,status:"success" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
}
exports.getAllOrders = async(req, res)=> {
  try {
    const orders = await Order.find().populate('userId').populate('productIds');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
}
exports.updateStatus = async(req,res,next)=>{
    try {
        const user =await Order.findByIdAndUpdate(req.params.id,req.body);
        res.json({ data: user,status:"success"});
    }catch(err){
        res.status(500).json({error: err.message});
    }

}
exports.getOrderDetailsById = async(req,res)=>{
    try{
        // console.log("user jsdn,fsmn",req.user)
        const productData = await Order.find({userId:req.params.id})
        // const bookingDataAndUserData = await bookingData.populate('ownerData')
        res.json({data:productData,status:"success"})
        console.log(productData)
    }catch(err){
        res.status(500).json({error:err.message})
    }
    
}

exports.deleteOrderDataUsingId = async(req,res,next)=>{
    try {
        const user =await Order.findByIdAndDelete(req.params.id);
        res.json({ data: user,status:"success"});
    }catch(err){
        res.status(500).json({error: err.message});
    }

}