const ProductRecord = require("./../models/productModule")
exports.createProduct = async(req,res,next)=>{
    if(req.body.image !== 'undefined'){
            req.body.image = req.file.filename
    }
    const product = new ProductRecord({...req.body,ownerData:req.user._id})
    try{
        const productData = await product.save()
        res.json({data:productData,status:"success"})

    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.getProductDetailsById = async(req,res)=>{
    try{
        const productData = await ProductRecord.findById(req.params.id)
        const productDataAndUserData = await productData.populate('ownerData')
        res.json({data:productDataAndUserData,status:"success"})
        console.log(productData)
    }catch(err){
        res.status(500).json({error:err.message})
    }
    
}

exports.getProductDetailsByIdForUser = async(req,res)=>{
    try{
        console.log("user jsdn,fsmn",req.user)
        const productData = await ProductRecord.find({ownerData:req.user.id})
        // const bookingDataAndUserData = await bookingData.populate('ownerData')
        res.json({data:productData,status:"success"})
        console.log(productData)
    }catch(err){
        res.status(500).json({error:err.message})
    }
    
}






exports.getAllProductDetails = async(req,res,next)=>{
    try{
        const productData = await ProductRecord.find().populate('ownerData')
        // const bookingDataAndUserData = await bookingData.populate('ownerData')
        res.status(200).json({data:productData,status:"success"})

    }catch(err){
        res.status(500).json({error:err.message})
    }
}
exports.deleteProductDataUsingId = async(req,res,next)=>{
    try {
        const user =await ProductRecord.findByIdAndDelete(req.params.id);
        res.json({ data: user,status:"success"});
    }catch(err){
        res.status(500).json({error: err.message});
    }

}

exports.updateProductDataUsingId = async(req,res,next)=>{
    try {
        const user =await ProductRecord.findByIdAndUpdate(req.params.id,req.body);
        res.json({ data: user,status:"success"});
    }catch(err){
        res.status(500).json({error: err.message});
    }

}
