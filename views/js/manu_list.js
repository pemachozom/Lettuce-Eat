fetch('http://localhost:4003/api/v1/products')
  .then((jsonData) => {
    return jsonData.json();
  })
  .then((objectData) => {
    let tableData = "";
    objectData.data.forEach((value) => {
      // console.log(value.catagory)
      if(value.catagory === "nonveg"){
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
                <button onclick="orderFood()" class="btn btn-primary">Order Now</button>
              </div>
          </div>`;
      }
    });

    // Find the target element(s)
    var elements = document.getElementsByClassName('nonveg-menu-item');

    // Iterate over each target element and append tableData
    for (var i = 0; i < elements.length; i++) {
      elements[i].innerHTML += tableData;
    }
  });



