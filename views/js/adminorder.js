fetch('http://localhost:4003/api/v1/orders')
  .then((jsonData) => {
    return jsonData.json();
  })
  .then((objectData) => {
    console.log(objectData)
    let j = 1;
    let tableData = "";
    var button;
    objectData.forEach((value) => {
      if(value.status == "pending"){
          button =`<button  class="btn btn-primary" onclick="acceptRequest('${value._id}')">Accept</button>`
      }else if(value.status == "done" && value.paymentStatus == "payed"){
        button =`<button onclick="deleteOrderfromDataBase('${value._id}')"  class="btn btn-danger">Delete</button>`
      }else if(value.status == "accepted"){
        button =`<button  class="btn btn-warning" onclick="doneRequest('${value._id}')">Done</button>`
      }else if(value.status == "done"){
        button = `<h2>Waiting for payment</h2>`
      }
      if(value.productIds.length==1){
        tableData += `
          <div class="col-sm-6 col-lg-6 border">
                <div class="card-body>
                  <h5 class="card-title">Name : ${value.userId.name}</h5>
                  <h5 class="card-title">Email : ${value.userId.email}</h5>
                </div>
                <div class="card-body">
                    <img src="./img/product/${value.productIds[0].image}" class="card-img-top" alt="...">
                    <h5 class="card-title">Product Name : ${value.productIds[0].productName}</h5>
                    <p class="card-text "> Product Price : ${value.productIds[0].productPrice}</p>
                    <p class="card-text "> Product Status : ${value.status}</p>
                    ${button}
                </div>
          </div>
        `
      }else if(value.productIds.length==2){
        tableData += `
        <div class="col-sm-6 col-lg-4 border w-50 row">
                <div class="card-body col-lg-6>
                    <h5 class="card-title">Name : ${value.userId.name}</h5>
                    <h5 class="card-title">Email : ${value.userId.email}</h5>
                </div>
                <div class="card-body col-lg-6">
                    <img src="./img/product/${value.productIds[0].image}" class="card-img-top" alt="...">
                    <h5 class="card-title">Product Name : ${value.productIds[0].productName}</h5>
                    <p class="card-text "> Product Price : ${value.productIds[0].productPrice}</p>
                </div>
                <div class="card-body col-lg-6">
                    <img src="./img/product/${value.productIds[1].image}" class="card-img-top" alt="...">
                    <h5 class="card-title"> Product Name : ${value.productIds[1].productName}</h5>
                    <p class="card-text "> Product Price : ${value.productIds[1].productPrice}</p>
                </div>
                <div class="card-body col-lg-12">
                  <p class="card-text col-lg-12 "> Product Status : ${value.status}</p>
                  ${button}
                </div>

            </div>
        `
      }
    });
    // console.log(tableData)

    // console.log(tableData);

    // Find the target element(s)
    var elements = document.getElementsByClassName("table_body");

    // Iterate over each target element and set the innerHTML to tableData
    for (var i = 0; i < elements.length; i++) {
      elements[i].innerHTML = tableData;
    }
  });
