/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const myList = document.getElementById("ajax_cities");
const time = document.getElementById("");
console.log(list);
console.log("Queries DHUN");
// http://localhost:5500/weather_index.html
/*SUBSCRIBE HERE FOR API KEY: https://home.openweathermap.org/users/sign_up*/
var myVar = setInterval(function () {
  myTimer();
}, 1000);

function myTimer() {
  var d = new Date();
  document.getElementById("clock").innerHTML = d.toLocaleTimeString();
}

const apiKey = "4d8fb5b93d4af21d66a2948710284366";
const ghh = "glendale heights";
function gh() {
  myList.innerHTML = "";
  console.log("gh code running!");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ghh}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      console.log(weather);
      let date_sunset = new Date(sys.sunset * 1000);
      let time_sunset = date_sunset.toLocaleTimeString();
      const li = document.createElement("li");
      const li2 = document.createElement("li");
      const li3 = document.createElement("li");
      li.classList.add("city");
      li2.classList.add("city");
      li3.classList.add("city");
      const markup = `
          <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
          </h2>
          <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup>
          </div>
          <figure>
            <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
            <figcaption>${weather[0]["description"]}</figcaption> 
          </figure>
        `;
      const markup_3 = `
      <h2 class="city-name" data-name="${name},${sys.country}">
      <span>Sunset Timing</span>      
    </h2>
    <div class="city-sunset">${time_sunset}
          </div>
    `;
      li.innerHTML = markup;
      li3.innerHTML = markup_3;
      //list = [];
      list.appendChild(li);
      list.appendChild(li2);
      list.appendChild(li3);
      console.log(sys.sunset);
      console.log(list);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });
}
gh();
setInterval(gh, 1800000);
