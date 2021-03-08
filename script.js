var data = fetch("https://restcountries.eu/rest/v2/all");

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
                <button class="btn btn-dark weather-btn" style="background-color: transparent;" countryName="${data[i].name}" onclick="getLatLong(this)">Click for weather</button>
            </div>
        </div>
        `
    }
document.querySelector(".container").innerHTML = countriesHTML;

})


function getLatLong(ele){
    var ctName = ele.getAttribute('countryName');
    var data = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ctName}&appid=fa2fc8ee8fa3b9d189f1d15326523568`);
    
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

