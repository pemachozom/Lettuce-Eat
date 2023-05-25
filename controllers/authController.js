const User = require('./../models/userModels')
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')
const { promisify } = require('util');
const multer = require('multer')


const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken = (user,statusCode, res) => {
    const token = signToken(user._id)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)

    res.status(statusCode).json({
        status: "success",
        token,
        data : {
            user
        }
    })
}

exports.signup = async (req, res, next) => {
    try{
    const newUser = await User.create(req.body)
    createSendToken(newUser, 201, res)
    //const token = signToken(newUser._id)

    //res.status(201).json({
      //  status: 'success',
        //token,
        //data : {
          //  user: newUser
       // }
  //  })
}
    catch(err) {
        res.status(500).json({error: err.message});
    }
    
}

exports.login = async (req, res, next) => {
    try {
        const { email, password} = req.body
        //1)check if email and password exist
        if (!email || !password) {
            return next(new AppError('Please provide an email and password!', 400))
        }
        //2) const if user exists && password is correct
        const user = await User.findOne({email}).select('+password')

        if (!user || !await user.correctPassword(password, user.password)) {

            return next(new AppError('Incorrect email or password', 401))
        }
        //3) if everyyhing ok, send token to client
        createSendToken(user,200, res)

        //const token = signToken(user._id)
        //res.status(200).json({
         //   status: 'success',
          //  token,
        //})

    }
    catch (err) {
        res.status(500).json({ error: err.message});

    }
}




exports.protect = async(req,res,next)=>{
    try{
        //1) getting token and check of its there
        let token 
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ){
            token = req.headers.authorization.split(' ')[1]
            
        }else if(req.cookies.jwt){
            token = req.cookies.jwt

        }
        if(!token){
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401),
            )
        }


        // 2) Verificatin token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        console.log(decoded)


        // 3) check if user still exits
        const freshUser = await User.findById(decoded.id)
        if(!freshUser){
            return next(
                new AppError('the user belonging to this token no longer exist',401)
            )
        }
        //Grant access to protected route
        req.user =freshUser
        next()


    }catch(err){
        res.status(500).json({error:err.message})
    }
}




// upload image
const multerStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'views/img/product')
    },
    filename:(req,file,cb)=>{
        //user-id-currenttimestamp.extention
        var obj = req.user.id;
        const ext = file.mimetype.split('/')[1]
        cb(null,`product-${obj}-${Date.now()}.${ext}`)
    }
})
const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new AppError('Not an image! please upload only image',400),false)
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter,
})
exports.uploadProductPhoto = upload.single('product')
