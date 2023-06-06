const User = require('./../models/userModels')
const AppError = require('../utils/appError')
const multer = require('multer')

const multerStorage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, 'views/img/users')
    },
    filename:(req, file, cb) => {
        var obj = JSON.parse(req.cookies.token)
        const ext = file.mimetype.split('/')[1]
        cb(null, `user-${obj['_id']}-${Date.now()}.${ext}`)
    },
})

const multerFilter = (req,file,cb) =>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new AppError('Not an image! Please upload only images', 400), false)
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter,
})


exports.uploadUserPhoto = upload.single('photo')

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json({data: users, status: 'success'})
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

exports.createUser = async (req,res) => {
    try {
        const user = await User.create(req.body);
        console.log(req.body)
        res.json({data: user, status : "success"});
    } catch (err) {
        res.status(500).json({error : err.message});
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({ data : user, status: "success"});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

exports.updateUser = async(req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body);
        res.json({data: user, status : "success"});
    } catch (err) {
        res.status(500).json({error : err.message});
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({ data : user, status: 'success'});

    }catch (err) {
        res.status(500).json({error: err.message})
    }
}


