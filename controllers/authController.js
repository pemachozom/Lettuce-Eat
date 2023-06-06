const User = require('./../models/userModels')
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')
const promisify = require('util').promisify

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
        console.log(req.headers)
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

exports.logout = (req,res) => {
    res.cookie('token', '',{
        expires: new Date(Date.now() + 10*1000),
        httpOnly:true,
    })
    res.status(200).json({status:'success'})
}

exports.protect = async (req, res, next) => {
    try {
        let token
        if(
            req.headers.authorization && 
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]
        }
        else if(req.cookies.jwt){
            token = req.cookies.jwt

        }
        if (!token){
            return next (
              new AppError('You are not logged in! Please log in to get access.', 401)
            )
          }

          const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
          console.log(decoded)

          // 3) check if user still exits
          const freshUser = await User.findById(decoded.id)
          if (!freshUser) {
            return next (
              new AppError('The user belonging to this token no longer exist', 401)
            )
          }
          req.user = freshUser
          next()
    
    
    }
    
    catch(err) {
        res.status(500).json({error: err.message});
      }
}

exports.updatePassword = async (req,res,next) => {
    try{
      const user = await User.findById(req.user._id).select('+password')
      if(!(await user.correctPassword(req.body.passwordCurrent, user.password))){
        return next(new AppError('Your current password is wrong',401))
  
      }
      user.password = req.body.password
      user.passwordConfirm = req.body.passwordConfirm
      await user.save()
  
      createSendToken(user, 200, res)
  
    }
    catch(err){
      res.status(500).json({error:err.message})
    }
}

const filterObj = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
  }
  

exports.updateMe = async(req,res,next) => {
    try{
      if(req.body.password || req.body.passwordConfirm){
        return next(
          new AppError(
            'This route is not for password updates. Please use /updateMyPassword',
            400,
          ),
        )
      }
  
      const filteredBody = filterObj(req.body, 'name', 'email')
      if(req.body.photo !== 'undefined'){
        filteredBody.photo = req.file.filename
      }
  
  
      var obj = JSON.parse(req.cookies.token)
      const updatedUser = await User.findByIdAndUpdate(obj['_id'], filteredBody, {
        new: true,
        runValidators:true,
      })
      res.status(200).json({
            status:'success',
            data: {user:updatedUser}
      })
    
  
    }
  
    //   
  
    
    catch (err) {
      res.status(500).json({ error:err.message})
  
    }
  }
  


  
  

