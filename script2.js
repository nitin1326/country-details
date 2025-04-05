const back = document.querySelector('.back-button');
back.href = "./index.html";

const countryName = new URLSearchParams(location.search).get('name');

const flagImage = document.querySelector('.country-img');
const countryTitle = document.querySelector('.grid-data h1');
const natviveName = document.querySelector('.native-name');
const region_data = document.querySelector('.region');
const sub_region = document.querySelector('.subregion');
const capital = document.querySelector('.capital');
const level_domain = document.querySelector('.top-level-domain');
const currence = document.querySelector('.currence');
const language = document.querySelector('.language');
const bordersDiv = document.getElementById("borders");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then(res => res.json())
  .then(([data]) => {
    // Flag & name
    flagImage.src = data.flags.svg;
    countryTitle.innerText = data.name.common;

    // Native name
    if (data.name.nativeName) {
      natviveName.innerText = Object.values(data.name.nativeName)[0].common;
    }

    // Region info
    region_data.innerText = data.region;
    sub_region.innerText = data.subregion;
    capital.innerText = data.capital;
    level_domain.innerText = data.tld;

    // Currency
    const currencyCode = Object.keys(data.currencies)[0];
    currence.innerText = data.currencies[currencyCode].symbol;

    // Languages
    const languageKeys = Object.keys(data.languages);
    const firstTwoLanguages = languageKeys.slice(0, 2);
    language.innerText = firstTwoLanguages.map(key => data.languages[key]).join(", ");

    // Borders
    bordersDiv.innerHTML = "<h2>Border Countries:</h2>";
    const borderCodes = data.borders;

    if (!borderCodes || borderCodes.length === 0) {
      bordersDiv.innerHTML += "<p>No border countries</p>";
    } else {
      fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`)
        .then(res => res.json())
        .then(borderCountries => {
          borderCountries.forEach(border => {
            const p = document.createElement("p");
            p.innerText = border.name.common;
            p.style.display = "inline-block";   // Make sure it's visible
            p.style.marginRight = "10px";
            p.style.padding = "5px 10px";
            p.style.border = "1px solid #ccc";
            p.style.borderRadius = "5px";
            p.style.backgroundColor = "#f0f0f0";
            bordersDiv.appendChild(p);
          });
        });
    }
  })
  .catch(error => {
    console.error("Error fetching country data:", error);
    bordersDiv.innerHTML = "<h2>Border Countries:</h2><p>Error loading borders</p>";
  });
