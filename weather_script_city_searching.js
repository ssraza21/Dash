/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const myList = document.getElementById("ajax_cities");
console.log(list);
console.log("Queries DHUN");
// http://localhost:5500/weather_index.html
/*SUBSCRIBE HERE FOR API KEY: https://home.openweathermap.org/users/sign_up*/

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

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
          <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
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
      li.innerHTML = markup;
      //list = [];
      list.appendChild(li);
      console.log(list);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
}
gh();
setInterval(gh, 1800000);

// The event listener for the submit button (submit is the specific type; ref in the HTML as well))
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = input.value;
  console.log("In the submit listener");
  //check if there's already a city
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);
  //listItemsArray.push("Chicago");
  console.log(listItemsArray);

  // OBVS This is for the scenario where there is more than one city
  if (listItemsArray.length > 0) {
    console.log("ayyo arrray bigger than one");
    const filteredArray = listItemsArray.filter((el) => {
      let content = "";
      //athens,gr
      if (inputVal.includes(",")) {
        // option for multiple inputs
        //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
        if (inputVal.split(",")[1].length > 2) {
          // split the input string into how many cities were mentioend
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        // Just one city !!!
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      console.log(content);
      return content == inputVal.toLowerCase();
    });

    // Code for repeat city
    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }

  console.log("ajax below");
  //inputVal = "amo";
  console.log(inputVal);
  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});
