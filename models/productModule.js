const { default: mongoose } = require("mongoose")
// const User = require("./User")
const productSchema =new mongoose.Schema({
    productName:{
        type:String,
        require:[true,"Please provide productName"]
    },
    productPrice:{
        type:Number,
        require:[true,"Please provide productPrice"]
    },
    catagory:{
        type:String,
        require:[true,"Please provide catagory "]
    },
    image:{
        type:String,
        default:"default.jpg",
        require:[true,"please provide image"]
    }
    // ownerData:{
    //     type:mongoose.Schema.ObjectId,
    //     required:true,
    //     ref:"User"
    // }

})

const ProductRecord =mongoose.model('ProductRecord',productSchema)
module.exports =ProductRecord