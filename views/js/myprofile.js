import { showAlert} from './alert.js'
// var obj;
var id = JSON.parse(document.cookie.substring(6));
fetch(`http://localhost:4003/api/v1/users/${id._id}`)
  .then(response => response.json())
  .then(object => {
    const obj = object.data
    var el = document.querySelector('.admin-nav')

var el1 = document.querySelector('form.form-user-data')
el1.innerHTML = 
    `<div class="form__group"> <label class="form__label" for="name">Name</label><input class="form__input" id="name" type="test" value="` +
    obj.name.toUpperCase() +
    `" required="required" name="name"/></div><div class="form__group
    ma-bt-md"><label class="form__label" for="email">Email Address</label>
    <input class="form__input" id="email" type="email" value="` +
    obj.email +
    `" required="required" name="email" />
    </div><div class="form__group form__photo-upload"><img class="form__user-photo" src="../img/users/` +
    obj.photo +
    `" alt="User photo"/><input class="form__upload" type="file"
    accept="image/*" id="photo" name="photo"/><label for="photo">Choose new photo</label></div>
    <div class="form__group left"><button class="btn btn--small
    btn--green">Save settings</button></div>`

    var el2 = document.querySelector('form.form-user-password')
    el2.innerHTML = 
        `<div class="form__group">
            <label class="form__label" 
            for="password-current">Current password</label>
            <input class="form__input" id="password-current"
            type="password" placeholder="********" required="required" 
            minlength="8"/>
        </div>
        <div class="form__group">
            <label class="form__label" 
            for="password">New password</label>
            <input class="form__input" id="password"
            type="password" placeholder="********" required="required" 
             minlength="8"/>
        </div>
          <div class="form__group ma-bt-lg">
          <label class="form__label" 
          for="password-confirm">Confirm password</label>
          <input class="form__input" id="password-confirm"
          type="password" placeholder="********" required="required" 
           minlength="8"/>
      </div>
      <div class="form__group right">
        <button class="btn btn--small btn--green 
        btn--save-password">Save password</button>
      </div>`
  })
  .catch(error => {
    console.error("Error:", error);
  });




      //Updating settings 

      // typr is either 'password' or data

      export const updateSettings = async (data, type) => {
        try {
            const url = 
                type === 'password'
                    ? 'http://localhost:4003/api/v1/users/updateMyPassword'
                    : 'http://localhost:4003/api/v1/users/updateMe'

            const res = await axios ({
                method: 'PATCH',
                url,
                data,
            })
            console.log(res.data.status) 
                if (res.data.status === 'success') {
                    showAlert('success', 'Data updated successfully')
                    setTimeout(() => {
                        window.location.reload(true)
                    }, 3000);
                }
            
        }catch (err) {
            let message = 
                typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message
        showAlert('error', err.response.data.message)
        }
      }

      const userDataForm = document.querySelector('.form.form-user-data')
      userDataForm.addEventListener('submit', (e) => {
        e.preventDefault()
        var obj = JSON.parse(document.cookie.substring(6))
        const form = new FormData()
        form.append('name', document.getElementById('name').value)
        form.append('email', document.getElementById('email').value)
        form.append('photo', document.getElementById('photo').files[0])
        form.append('userId', obj._id)
        console.log(form)
        updateSettings(form, 'data')
      })
      const userPasswordForm = 
        document.querySelector('.form.form-user-password')
        userPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            document.querySelector('.btn--save-password').textContent = 'Updating...'
            const passwordCurrent = 
                document.getElementById('password-current').value
            const password = 
                document.getElementById('password').value
            const passwordConfirm =
                document.getElementById('password-confirm').value
            await updateSettings(
                { passwordCurrent,password,passwordConfirm},
                'password',
            )
            document.querySelector('.btn--save-password').textContent = 'Save password'
            document.querySelector('password-current').value = ''
            document.getElementById('password').value = ''
            document.getElementById('password-confirm').value = ''

        })


