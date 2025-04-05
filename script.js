const countrycontainers = document.querySelector('.countries-container');

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    let foundIndia = false;  // To check if India appears
    data.forEach((country) => {
      const countryCard = document.createElement('a');
      countryCard.classList.add('country-card');

      // Check if capital exists
      const capital = country.capital ? country.capital[0] : "N/A";

      const cardHtml = ` 
        <img src="${country.flags.svg}" alt="flag">
        <div class="card-text">
          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
          <p><b>Region: </b>${country.region}</p>
          <p><b>Capital: </b>${capital}</p>
        </div>
      `;

      countryCard.innerHTML = cardHtml;
      countryCard.href = `/details.html?name=${encodeURIComponent(country.name.common)}`;

      countrycontainers.append(countryCard);

      if (country.name.common === "India") {
        foundIndia = true;
      }
    });

    if (!foundIndia) {
      console.warn("India is missing from the API response!");
    }
  })
  .catch((error) => console.error("Error fetching country data:", error));
