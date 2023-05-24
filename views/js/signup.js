// let menubar = document.querySelector('#menu-bar')
// let nav = document.querySelector('.navbar')


// menubar.onclick = () =>{
//     menubar.classList.toggle('fa-times')
//     nav.classList.toggle('active')
  
    
// }


// const sr = ScrollReveal ({
//     distance : '45px',
//     duration : 2700,
//     reset : true,
//   })

//   sr.reveal('.myimageabout',{ delay:350, origin:'left' })
//   sr.reveal('.about-text-content',{ delay:350, origin:'right' })
//   sr.reveal('.home-image',{ delay:350, origin:'left' })
//   sr.reveal('.home-text-content',{ delay:350, origin:'right' })

//   sr.reveal('.quality-content',{ delay:350, origin:'left' })
//   sr.reveal('.qulity-image',{ delay:350, origin:'right' })
//   sr.reveal('.gallery-image',{ delay:350, origin:'top' })
//   sr.reveal('.menu-food-content',{ delay:350, origin:'top' })
//   sr.reveal('.menu-food-text',{ delay:350, origin:'bottom' })
//   sr.reveal('.food-main-content',{ delay:350, origin:'bottom' })
//   sr.reveal('.before',{ delay:350, origin:'bottom' })
//   sr.reveal('.footer-logo',{ delay:350, origin:'bottom' })


import { showAlert } from './alert.js'

export const signup = async (name, email, password, passwordConfirm) => {
    try{
        
        const res = await axios({
            method:'POST',
            url:'http://localhost:4000/api/v1/users/signup',
            data:{
                name,
                email,
                password,
                passwordConfirm,
            },
        })
        if(res.data.status === 'success'){
            showAlert('success', "Accounted created successfully")
            window.setTimeout(()=>{
                location.assign('/')
            }, 1500)
        }
    }
    catch(err){
        let message =
            typeof err.response !== 'undefined'?
            err.response.data.message
            :err.message
        showAlert('error', 'Error:Passwords are not same!', message)
        
    }
}

console.log("bdsskh")
 
document.querySelector('.needs-validation').addEventListener('submit', (e) =>{
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('confirm-password').value
 
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(passwordConfirm)
    

    signup(name, email, password, passwordConfirm)
})

