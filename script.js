// //1.Create a request variable
// var request =new XMLHttpRequest();
// //2.Create a connection.
// //Open has three parameter(get method,url,boolean)
// request.open('GET','https://restcountries.eu/rest/v2/all',true);
// //3.Send the request
// request.send();
// //4.Process and Load the response
// request.onload = function(){  //function name not necessary coz attached to event
//   var data=JSON.parse(this.response);
//   let countriesHTML="";
//   for(let i=0;i<5;i++){
//     countriesHTML += ` 
//     <div class="card" style="width: 18em;">
//         <div class="card card-header" id="id-name" style="background-color: black; color: blanchedalmond; text-align: center;">${data[i].name}</div>
//         <img class="card-img-top" id="img-id" src="${data[i].flag}" style="padding: 10px;background-image: linear-gradient(90deg,#cede64,#6e7541);">
//         <div class="card-body" style="background-image: linear-gradient(90deg,#cede64,#6e7541);text-align: center;">
//             <p class="card-text" id="p-id-capital">${data[i].capital}</p>
//             <p class="card-text" id="p-id-population">${data[i].population}</p>
//             <p class="card-text" id="p-id-region">${data[i].region}</p>
//             <p class="card-text" id="p-id-country-code">${data[i].alpha3Code}</p>
//             <button class="btn btn-dark" style="background-color: transparent;">Click for weather</button>
//         </div>
//     </div>
//     `
//   }
// }
var data = fetch("http://restcountries.eu/rest/v2/all");

data.then(function(response){
    return response.json();
})
.then(function(response){
    var data = response;
    let countriesHTML="";
    for(let i=0;i<data.length;i++){
        countriesHTML += ` 
        <div class="card" style="width: 18em;">
            <div class="card-header" id="id-name">${data[i].name}</div>
            <img class="card-img-top" id="img-id" src="${data[i].flag}">
            <div class="card-body" style="background-image: linear-gradient(90deg,#cede64,#6e7541);text-align: center;">
                <p class="card-text" id="p-id-capital">Capital:${data[i].capital}</p>
                <p class="card-text" id="p-id-population">Population:${data[i].population}</p>
                <p class="card-text" id="p-id-region">Region:${data[i].region}</p>
                <p class="card-text" id="p-id-country-code">Country Code:${data[i].alpha3Code}</p>
                <button class="btn btn-dark weather-btn" style="background-color: transparent;" countryName=${data[i].name} onclick="getLatLong(this)">Click for weather</button>
            </div>
        </div>
        `
    }
document.querySelector(".container").innerHTML = countriesHTML;

})


function getLatLong(ele){
    var ctName = ele.getAttribute('countryName');
    var data = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ctName}&appid=fa2fc8ee8fa3b9d189f1d15326523568`);
    
    data.then(function(response){
        return response.json();
    })

    .then(function(data){
       
            var weather=data.weather[0].description;
            var dataToBE = `
        Country: ${data.name}⛳        
        Weather: ${weather}⛅
        Humidity: ${data.main.humidity}💧
        WindSpeed:${data.wind.speed}🌪
        `
       
        alert(dataToBE);
    })

}

