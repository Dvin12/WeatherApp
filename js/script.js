const form = document.querySelector("#search-form");
const input = document.querySelector(".header__form input");
const list = document.querySelector(".info");

const apiKey = "df64afae23fae2a3b41d8fb056651f17";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputVal = input.value;

  const listItemsArray = Array.from(list.querySelectorAll(".info li"));

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter((el) => {
      let content = "";
      let cityName = el
        .querySelector(".info__description__conditions__city")
        .textContent.toLowerCase();
      let cityCountry = el
        .querySelector(".info__description__conditions__city__country")
        .textContent.toLowerCase();

      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = input.split(",")[0];

          content = cityName;
        } else {
          content = `${cityName}, ${cityCountry}`;
        }
      } else {
        content = cityName;
      }

      return content == inputVal.toLowerCase();
    });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;

      const icon = `svg/${weather[0]["icon"]}.svg`;

      const li = document.createElement("li");

      const markup = `
      <img src="${icon}" alt="${weather[0]["description"]}" />
      <div class="info__description">
        <h2>${Math.round(main.temp)} <sup>&deg; C</sup></h2>
        <p class="info__description__conditions">${weather[0][
          "description"
        ].toUpperCase()}</p>
        <h3 class="info__description__conditions__city">
          ${name}
          <span class="info__description__conditions__city__country"
            >${sys.country}</span
          >
        </h3>
      </div>`;

      li.innerHTML = markup;
      list.appendChild(li);
    });
});
