

fetch('http://localhost:4003/api/v1/products')
  .then((jsonData) => {
    return jsonData.json();
  })
  .then(async(objectData) => {
    const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null; // Cookie not found
    };
    const respond = getCookie("token")
    const tokenObject = JSON.parse(respond);
    console.log("tiken",tokenObject._id)
    // alert(tokenObject._id)
    const checkPayment = await axios({
      method:"GET",
      url:`http://localhost:4003/api/v1/orders/orderedList/${tokenObject._id}`
    })
    console.log(checkPayment.data.data[checkPayment.data.data.length - 1])
    if (
  (checkPayment.data.data.length > 0 &&
    checkPayment.data.data[checkPayment.data.data.length - 1].paymentStatus ==
      "payed") ||
  checkPayment.data.data.length == 0
) {
  const modal = `
    <tr>
      <th scope="col"></th>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Qty</th>
      <th scope="col">Total</th>
      <th scope="col">Actions</th>
    </tr>
  `;
  const button = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" onclick="handleOrderSubmit()" class="btn btn-success">Checkout</button>`
  document.getElementsByClassName("modalData")[0].innerHTML += modal;
  document.getElementsByClassName("handleDifferentButton")[0].innerHTML = button

} else {
  const modal = `
    <div>
      <h2>203856781</h2>
      <input type="text" class="jnrlNo" required placeholder="Enter Journal Number">
    </div>
  `;

  const button = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" onclick="handlePaymentJonal('${checkPayment.data.data[checkPayment.data.data.length - 1]._id}')"  class="btn btn-success">Send</button>`
  document.getElementsByClassName("modalData")[0].innerHTML = modal;
  document.getElementsByClassName("handleDifferentButton")[0].innerHTML = button
  document.getElementsByClassName("grandTotal")[0].innerHTML = checkPayment.data.data[checkPayment.data.data.length - 1].total
}

    // http://localhost:4003/api/v1/orders/orderedList/6482ed3302beb1b835417856


    let tableData = "";
    let nonVeg = ""
    objectData.data.forEach((value) => {
      // console.log(value)
      if(value.catagory === "veg"){
        tableData +=
        `<div class="col-md-4">
            <div class="food-item">
                <div class="zoom-image">
                    <img src="./img/product/${value.image}" alt="Burger">
                </div>
                <div>
                  <h4 class="mb-1">${value.productName}</h4>
                  <span class="text-muted">Price: Nu. ${value.productPrice}</span>
                </div>
                <button onclick="orderFood('${value._id}','${value.catagory}','${value.image}','${value.productName}','${value.productPrice}')" class="btn btn-primary">Order Now</button>
              </div>
          </div>`;
      }else{
        nonVeg+=
        `<div class="col-md-4">
            <div class="food-item">
                <div class="zoom-image">
                    <img src="./img/product/${value.image}" alt="Burger">
                </div>
                <div>
                  <h4 class="mb-1">${value.productName}</h4>
                  <span class="text-muted">Price: Nu. ${value.productPrice}</span>
                </div>
                <button onclick="orderFood('${value._id}','${value.catagory}','${value.image}','${value.productName}','${value.productPrice}')" class="btn btn-primary">Order Now</button>
              </div>
          </div>`;
      }
    });

    // Find the target element(s)
    console.log(tableData)
    var elements = document.getElementsByClassName('veg-menu-item');
    for (var i = 0; i < elements.length; i++) {
      elements[i].innerHTML += tableData;
    }

    // Non-veg-menu-item
    var nonVe = document.getElementsByClassName('Non-veg-menu-item');
    for (var i = 0; i < nonVe.length; i++) {
      nonVe[i].innerHTML += nonVeg;
    }
  });