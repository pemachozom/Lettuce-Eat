// import { json } from 'express/lib/response.js'
// import {showAlert} from './alert.js'
// import axios from "axios"
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Example usage


const login = async(email,password)=>{
    try{
        alert(email+password)
        const res = await axios({
            method:'POST',
            url:'http://localhost:4003/api/v1/users/login',
            data:{
                email,
                password,
            },
        })
        console.log(res.data)
        if(res.data.status==='success'){
            // alert('success','logged in successfully')
            showToast('This is a toast message!');

            // showAlert('success','logged in successfully')
            window.setTimeout(()=>{
                location.assign('/')
            },1500)
        }
        var obj = res.data.data.user
        console.log(obj)
        document.cookie =' token = '+JSON.stringify(obj) 
        console.log(obj)

    }catch(err){
        let message = typeof err.response !== 'undefined'? err.response.data.message:err.message
        // showAlert('error', 'Error : Incorrect email or password', message)
        alert(message)
        // showAlert('error', 'Error : Incorrect email or password')

    }
}


document.querySelector('.loginButton').addEventListener('click',(e)=>{
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    alert(password)
    login(email,password)

})
