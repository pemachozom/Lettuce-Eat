fetch('http://localhost:4003/api/v1/users')
  .then((jsonData) => {
    return jsonData.json();
  })
  .then((objectData) => {
    let j = 1;
    let tableData = "";
    objectData.data.forEach((value) => {
        // console.log()

      tableData += `
      
        <tr>
          <td>${j}</td>
          <td>${value.name}</td>
          <td>${value.email}</td>
          <td>${value.role}</td>
          <td>
            <button onclick="DeleteUser('${value._id}')" style="border-radius: 5px; width: 2cm">Delete</button>
          </td>
        </tr>`;
      j++;
    });

    console.log(tableData);

    // Find the target element(s)
    var elements = document.getElementsByClassName("table_body");

    // Iterate over each target element and set the innerHTML to tableData
    for (var i = 0; i < elements.length; i++) {
      elements[i].innerHTML = tableData;
    }
  });
