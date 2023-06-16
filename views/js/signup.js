import { showAlert } from './alert.js'

export const signup = async (name, email, password, passwordConfirm) => {
    try{
        const res = await axios({
            method: 'POST',
            url : 'http://localhost:4003/api/v1/users/signup',
            data:{
                name,
                email,
                password,
                passwordConfirm,
            },
        })
    console.log(res.data) 
    if(res.data.status === 'success'){
        showAlert('success', 'Account created successfully!')
        window.setTimeout(() => {
            location.assign("/login")
        }, 1500)
    }        

    }catch (err) {
        console.log(err)
        showAlert('error', 'Error: Enter detail corrrectly')

    }
}

document.querySelector('.signUPButton').addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    signup(name, email, password, passwordConfirm);
});
