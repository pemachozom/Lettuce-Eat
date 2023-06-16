import { showAlert } from './alert.js'


const login = async(email,password)=>{
    try{
        const res = await axios({
            method:'POST',
            url:'http://localhost:4003/api/v1/users/login',
            data:{
                email,
                password,
            },
        })
        // console.log(res)
        if(res.data.status==='success' ){
            if(res.data.data.user.role == "buyer"){
                var obj = res.data.data.user
                console.log(obj)
                document.cookie =' token = '+JSON.stringify(obj) 
                console.log(obj)
                showAlert('success','logged in successfully')
                window.setTimeout(()=>{
                    location.assign('/veg')
                },5000)
            }else{
                var obj = res.data.data.user
                console.log(obj)
                document.cookie =' token = '+JSON.stringify(obj) 
                console.log(obj)
                showAlert('success','logged in successfully')
                window.setTimeout(()=>{
                    location.assign('/addproduct')
                },5000)
            }
            
        }else{
            showAlert("error","login failed : check the password")
        }
       

    }catch(err){
        console.log("err",err)
        let message = typeof err.response !== 'undefined'? err.response.data.message:err.message
        // showAlert('error', 'Error : Incorrect email or password', message)
        // alert(message)
        showAlert('error', 'Error : Incorrect email or password')

    }
}


document.querySelector('.loginButton').addEventListener('click',(e)=>{
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email,password)

})