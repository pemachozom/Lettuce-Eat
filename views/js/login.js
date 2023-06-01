import { showAlert } from "./alert.js"

const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:4000/api/v1/users/login',
            data: {
                email,
                password
            },
        })

        console.log(res)
        if (res.data.status == 'success') {
            window.alert('Logged in successfully')
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
            var obj = res.data.data.user
            // console.log(obj)
            document.cookie = ' token = ' + JSON.stringify(obj)
            // console.log(obj)
        }
        
    } catch (err) {
        let message = 
            typeof err.response !== 'undefined'
            ? err.response.data.message
            :err.message
        window.alert( 'Error: Incorrect email or password', message)
    }
}

document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log(email)
    console.log(password)
    login(email, password)
})
