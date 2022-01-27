const submitBtn = document.querySelector('.submit')
const randomBtn = document.querySelector('.random')
const countryInput = document.querySelector('.country-input');
const countryContainer = document.querySelector('.country-container')
const neighbourCountryContainer = document.querySelector('.neighbour-country-container')


const fillInputList = function() {
  fetch(`https://restcountries.com/v2/all`)
    .then(response => response.json())
    .then(data => {
      data.forEach((country) => {
        const option = `<option value=${country.name}>${country.name}</option>`
        countryInput.insertAdjacentHTML('beforeend', option);
      });
    });
};

const renderCountry = function(data) {
  const countryCard = `
  <div class="country-card">
    <img src="${data.flag}" alt="">
    <div class="country">
      <h1>${data.name}</h1>
      <h3>${data.region}</h3>
      <div class="country-details">
        <p>Population: <span>${data.population}</span></p>
        <p>Area: <span>${data.area}</span></p>
        <p>Capital: <span>${data.capital}</span></p>
        <p>Language: <span>${data.languages[0].name}</span></p>
        <p>Currency: <span>${data.currencies[0].name}</span></p>
        <p>Code: <span>${data.alpha3Code}</span></p>
      </div>
    </div>
  </div>
  `;
  countryContainer.insertAdjacentHTML('beforeend', countryCard);
  console.log(data)
};

const renderNeighbourCountry = function(data) {
  const neighbourCountryCard = `
  <div class="neighbour-country-card">
    <img src="${data.flag}" alt="">
    <div class="country neighbour">
      <h2>${data.name}</h2>
      <div class="neighbour-country-details">
        <p>Capital: <span>${data.capital}</span></p>
        <p>Population: <span>${data.population}</span></p>
        <p>Area: <span>${data.area}</span></p>
      </div>
    </div>
  </div>
  `;
  neighbourCountryContainer.insertAdjacentHTML('beforeend', neighbourCountryCard);
  console.log(data)
};


const getCountryData = function() {
  while (countryContainer.firstChild)  {
    countryContainer.firstChild.remove()
  }
  while (neighbourCountryContainer.firstChild)  {
    neighbourCountryContainer.firstChild.remove()
  }
  country = countryInput.value;
  console.log(`getCountryData called for ${country}`)
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      console.log(data[0].borders);
      data[0].borders.forEach((code) => {
        fetch(`https://restcountries.com/v2/alpha/${code}`)
          .then(response => response.json())
          .then(data => renderNeighbourCountry(data));
      });
    });
  countryInput.value = "";
};

fillInputList()

randomBtn.addEventListener('click', function(){
  fetch(`https://restcountries.com/v2/all`)
    .then(response => response.json())
    .then(data => {
      const random = Math.floor(Math.random() * data.length)
      const country = data[random]
      countryInput.value = country.name;
    });
});

submitBtn.addEventListener('click', function(){getCountryData()});

document.addEventListener('click', function(){
  const element = event.target;
  if (element.className.includes('neighbour')){
    console.log(element);
    const countryName = element.getElementsByTagName("h2")[0].innerHTML;
    console.log(countryName);
    countryInput.value = countryName;
    getCountryData();
  }
})
