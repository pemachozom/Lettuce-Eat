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
