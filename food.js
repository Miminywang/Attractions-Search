const url = "https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=50&%24format=JSON"
const food = document.querySelector(".text");

fetch (url)
  .then (
    function (response){
      return response.json();     
    })
  .then ( 
    function (data){
      console.log(data);
      render(data)
    })
  .catch ( 
    function() {
    alert("no info")
    }
  )

  function render(data) {
    let str="";
    data.forEach(element => {
      str +=`
          <li>${element.RestaurantName}</li>
      `
    });
    food.innerHTML = str;
  }



  // footer
const date = new Date();
const currentDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

document.getElementById("copyright").innerHTML = `&copy ${currentDate} All Rights Reserved`;
