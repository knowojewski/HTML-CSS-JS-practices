const input = document.querySelector('.input-text');
const button = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.wrong-input');
const photo = document.querySelector('.image');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=de1b8541a2e96d2edf424da5d7eeb360';
const units = '&units=metric';

let city;
let url;


const getWeather = () => {
    city = (!input.value) ? 'Rzeszów' : input.value;
    url = apiLink + city + apiKey + units;

    axios.get(url)
        .then(res => {
            console.log(res.data.weather);
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const name = res.data.name;
            const status = Object.assign({}, ...res.data.weather);

            input.value = '';
            warning.textContent = '';

            cityName.textContent = name;
            temperature.textContent = Math.floor(temp) + '\xB0C';
            humidity.textContent = hum + '%';
            // weather.textContent = res.data.weather[0].main;
            weather.textContent = status.main;

            if (status.id >= 200 && status.id < 300) {
                photo.setAttribute('src', 'http://openweathermap.org/img/wn/11d@2x.png');

            } else if (status.id >= 300 && status.id < 500) {
                photo.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png');

            } else if (status.id >= 500 && status.id < 511) {
                photo.setAttribute('src', 'http://openweathermap.org/img/wn/10d@2x.png');

            } else if (status.id === 511) {
                photo.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png');
                
            } else if (status.id >= 520 && status.id < 600) {
                photo.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png');

            } else if (status.id >= 600 && status.id < 700) {
                photo.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png');

            } else if (status.id >= 700 && status.id < 800) {
                photo.setAttribute('src', 'http://openweathermap.org/img/wn/50d@2x.png');
            
            } else if (status.id === 800) {
                photo.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');

            } else if (status.id === 801) {
                photo.setAttribute('src', 'http://openweathermap.org/img/wn/02d@2x.png');

            } else if (status.id === 802) {
                photo.setAttribute('src', 'http://openweathermap.org/img/wn/03d@2x.png');

            } else if (status.id === 803 || status.id === 804) {
                photo.setAttribute('src', 'http://openweathermap.org/img/wn/04d@2x.png');

            }

            console.log(status);
        })
        .catch( err => {
            warning.textContent = 'Wpisz prawidłową nazwę';
            input.value = '';
        })
};

const checkEnter = () => {
    if(event.keyCode === 13) {
        getWeather();
    }
};


getWeather();
button.addEventListener('click', getWeather);
input.addEventListener('keyup', checkEnter);