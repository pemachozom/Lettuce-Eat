import { showAlert } from "./alert.js"

    const addproduct=async(form)=>{
        const res = await axios({
            method:'POST',
            url:'http://localhost:4003/api/v1/products/addproduct',
            data:form,
            headers: {
                'Content-Type': 'multipart/form-data' // Add any additional headers if required
            }
        })
        if(res.data.status==="success"){
            showAlert("success","successfully added")


             document.getElementById("productName").value=" "
             document.getElementById("productPrice").value=" "
             document.getElementById("catagory").value=" "
            document.getElementById("product").value=" "
        }else{
            showAlert("error","product addFailed")
        }
        settimeout(()=>{
            window.location.reload(true)
        },4000)
        

        
    }
document.getElementById("addProductButton").addEventListener("click",(e)=>{
    e.preventDefault()
    // var productName = document.getElementById("productName").value
    // var productPrice = document.getElementById("productPrice").value
    //  var catagory = document.getElementById("catagory").value

    const form = new FormData()
    form.append('productName', document.getElementById('productName').value)
    form.append('productPrice', document.getElementById('productPrice').value)
    form.append('product', document.getElementById('product').files[0])
    form.append('catagory', document.getElementById('catagory').value)
    console.log(form)
    addproduct(form)
  


    

})