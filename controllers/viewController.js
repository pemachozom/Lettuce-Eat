const path = require('path')

/*log in page*/
exports.getLoginForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'login.html'))

}

/* sign up page */
exports.getSignupForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../','views', 'signup.html'))
}

/* home page*/
exports.getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'index.html'))
}

exports.veg = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'vegetarine.html'))
}

exports.nonveg = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'menu_list.html'))
}
exports.addproduct = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'addproduct.html'))
}
exports.userdisplay = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'userdisplay.html'))
}
exports.adminorder = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'item.html'))
}
exports.cart = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'cart.html'))
}
exports.about = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'about.html'))
}
exports.myprofile = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'profile.html'))
}