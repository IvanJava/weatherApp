window.addEventListener('load', ()=> {
    //variables
    let long;
    let lat;
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.weather-icon');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //proxy to avoid cors error
            const proxy = 'https://cors-anywhere.herokuapp.com/'; 
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=7878c94a53b2c53bc0aeea51d25677f6`;
            //after you get info from api you can do smth with this data/convert it in json
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                console.log(data);
                //set Dom elements from the API
                temperatureDegree.textContent = data.main.temp;
                locationTimezone.textContent = data.name;
                temperatureDescription.textContent = data.weather[0].description;
                const {icon} = data.weather[0];
                locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
                locationIcon.style.color = 'white';
            });
        });
    }
});