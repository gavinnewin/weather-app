import './style.css';

let curX = 0;
let curY = 0;
let tgX = 0;
let tgY = 0;
//hi
window.addEventListener('DOMContentLoaded', () => {
  const interBubble = document.querySelector('.interactive') as HTMLDivElement;
  function move() {
    curX += (tgX - curX) / 7;
    curY += (tgY - curY) / 7;
    interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(() => {
      move();
    });
  }
  window.addEventListener('mousemove', (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
  });
  move();

  const container = document.querySelector('.container') as HTMLElement;
  const search = document.querySelector('.search-box button') as HTMLElement;
  const weatherBox = document.querySelector('.weather-box') as HTMLElement;
  const weatherDetails = document.querySelector('.weather-details') as HTMLElement;
  const error404 = document.querySelector('.not-found') as HTMLElement;
  const cityHide = document.querySelector('.city-hide') as HTMLElement;

  search.addEventListener('click', () => {
    const APIKey = '7c6d3bb0170d900ea37a7c544685a553';
    const cityInput = document.querySelector('.search-box input') as HTMLInputElement;
    const city = cityInput.value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === '404') {
          cityHide.textContent = city;
          container.style.height = '400px';
          weatherBox.classList.remove('active');
          weatherDetails.classList.remove('active');
          error404.classList.add('active');
          return;
        }

        const image = document.querySelector('.weather-box img') as HTMLImageElement;
        const temperature = document.querySelector('.weather-box .temperature') as HTMLElement;
        const description = document.querySelector('.weather-box .description') as HTMLElement;
        const humidity = document.querySelector('.weather-details .humidity span') as HTMLElement;
        const wind = document.querySelector('.weather-details .wind span') as HTMLElement;

        if (cityHide.textContent === city) return;

        cityHide.textContent = city;

        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
          container.classList.remove('active');
        }, 2500);

        switch (json.weather[0].main) {
          case 'Clear':
            image.src = '/images/clear.png';
            break;
          case 'Rain':
            image.src = '/images/rain.png';
            break;
          case 'Snow':
            image.src = '/images/snow.png';
            break;
          case 'Clouds':
            image.src = '/images/cloud.png';
            break;
          case 'Mist':
          case 'Haze':
            image.src = '/images/mist.png';
            break;
          default:
            image.src = '/images/cloud.png';
        }

        const tempInFahrenheit = (json.main.temp * 9) / 5 + 32;
        temperature.innerHTML = `${Math.round(tempInFahrenheit)}<span>°F</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${Math.round(json.wind.speed)}Km/h`;

        const infoWeather = document.querySelector('.info-weather') as HTMLElement;
        const infoHumidity = document.querySelector('.info-humidity') as HTMLElement;
        const infoWind = document.querySelector('.info-wind') as HTMLElement;

        const elCloneInfoWeather = infoWeather.cloneNode(true) as HTMLElement;
        const elCloneInfoHumidity = infoHumidity.cloneNode(true) as HTMLElement;
        const elCloneInfoWind = infoWind.cloneNode(true) as HTMLElement;

        elCloneInfoWeather.id = 'clone-info-weather';
        elCloneInfoWeather.classList.add('active-clone');
        elCloneInfoHumidity.id = 'clone-info-humidity';
        elCloneInfoHumidity.classList.add('active-clone');
        elCloneInfoWind.id = 'clone-info-wind';
        elCloneInfoWind.classList.add('active-clone');

        setTimeout(() => {
          infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
          infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
          infoWind.insertAdjacentElement('afterend', elCloneInfoWind);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
        const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
        const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');

        if (cloneInfoWeather.length > 0) {
          (cloneInfoWeather[0] as HTMLElement).classList.remove('active-clone');
          (cloneInfoHumidity[0] as HTMLElement).classList.remove('active-clone');
          (cloneInfoWind[0] as HTMLElement).classList.remove('active-clone');

          setTimeout(() => {
            cloneInfoWeather[0].remove();
            cloneInfoHumidity[0].remove();
            cloneInfoWind[0].remove();
          }, 2200);
        }
      });
  });
});
