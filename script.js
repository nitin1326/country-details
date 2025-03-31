const countrycontainers = document.querySelector('.countries-container')

fetch("https://restcountries.com/v3.1/all")
.then((res)=> res.json())
   .then((data)=>{
    data.forEach((country)=>{
        const countryCard = document.createElement('a');

        countryCard.classList.add('country-card')
        
        const cardHtml = ` 
         <img src="${country.flags.svg}" alt="flag">
                        <div class="card-text">
                            <h3 class="card-title">${country.name.common}</h3>
                            <p><b>Population: </b>${country.population.toLocaleString('en-In')}</p>
                            <p><b>Region: </b>${country.region}</p>
                            <p><b>Capital: </b>${country.capital[0]}</p>
                        </div>
        `
        
        countryCard.innerHTML = cardHtml
        countryCard.href = "/details.html"
        
        countrycontainers.append(countryCard)
    })
})





