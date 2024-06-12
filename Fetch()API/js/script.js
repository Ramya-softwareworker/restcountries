
const url = "https://restcountries.com/v3.1/all";

//to display the fetched data in console to html page

const res = fetch(url);
res
  .then((data) => data.json())
  .then((ele) => {
    const Div = document.querySelector(".container");

    for (let i = 0; i < ele.length; i++) {
      const rowDiv = document.createElement("div");
      rowDiv.setAttribute("class", "row");
      Div.append(rowDiv);

      const colDiv = document.createElement("div");
      colDiv.setAttribute("class", "col-lg-4 col-sm-12 g-4");
      rowDiv.append(colDiv);

      const cardDiv = document.createElement("div");
      cardDiv.setAttribute("class", "card");
      colDiv.append(cardDiv);

      cardDiv.innerHTML = `
               <div class="card-header">${ele[i].name.common}</div>
                 <img src="${ele[i].flags.png}" class="card-img-top" alt="flag">
                  <div class="card-body">
                   <h5 class="card-title">Capital:${ele[i].capital}</h5>
                   <h5 class="card-title">Region:${ele[i].region}</h5>
                   <h5 class="card-title">Country Code:${ele[i].cca2}</h5>
                   <h5 class="card-title">Lattitude/longitude:${ele[i].capitalInfo.latlng}</h5>
    
                   <button type="button" class="btn btn-primary" onClick="getData('${ele[i].name.common}')">Click for Weather</button>
                   </div>`;
    }
    document.body.append(Div);
  });

//Fetch request to get  weather  data using country name
function getData(countryName) {
  var API = "c02261a4253df3ce46b5c3e7b4d4bc82";
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${API}`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      var weatherCountryName = weatherData.name;

      if (weatherCountryName === countryName) {
       // console.log(weatherData);
       const container2 = document.querySelector(".container2")
       container2.innerHTML ="";
        const weatherCard = document.createElement("div");
        weatherCard.classList.add("List", "mb-3", "w-50");

        // Extracting temperature, humidity, and weather description
        const temperature = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const weatherDescription = weatherData.weather[0].description;

        weatherCard.innerHTML = `
        <div class="card-body">
       <h3> Weather in ${weatherData.name}:</h3>
       <p> Minimum Temperature: ${weatherData.main.temp_min} deg&c </p>
      <p>  Maximum Temperature: ${weatherData.main.temp_max} deg&c </p>
      <p>Temperature: ${temperature} K</p>
      <p>Humidity: ${humidity}%</p>
      <p>Weather Description: ${weatherDescription}</p>
      </div>
      `;
        

        container2.append(weatherCard);
      } 
      else {
        alert("Country names donot match");
      }
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
      alert`Error fetching weather data.`;
    });
}
