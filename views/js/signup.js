import { showAlert } from './alert.js'

export const signup = async (name, email, password, passwordConfirm) => {
    try{
        const res = await axios({
            method: 'POST',
            url : 'http://localhost:4000/api/v1/users/signup',
            data:{
                name,
                email,
                password,
                passwordConfirm,
            },
        })
    //console.log(res) 
    if(res.data.status === 'success'){
        showAlert('success', 'Account created successfully!')
        window.setTimeout(() => {
            location.assign("/")
        }, 1500)
        // var obj = res.data.data.user
        // console.log(obj)
        // document.cookie = ' token = ' + JSON.stringify(obj)
        // console.log(obj)

    }        

    }catch (err) {
        let message =
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message
        showAlert('error', 'Error: Passwords are not the same!', message)

    }
}

document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('password-confirm').value
    signup(name,email,password,passwordConfirm)
}) 