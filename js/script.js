const form = document.querySelector("#search-form");
const input = document.querySelector("#serach");
const list = document.querySelector(".info");

const apiKey = "df64afae23fae2a3b41d8fb056651f17";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputVal = input.ariaValueMax;

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

  const url = "https://api";
});
