/*
    Author: Alan Henry
    JavaScript for the Weather API website
*/

// Set variables
let target = 'London';

// Set constants for HTML
const searchField = document.querySelector('#search-field');
const form = document.querySelector('form');
const locationNameField = document.querySelector('.location-name');
const locationCountryField = document.querySelector('.location-country');
const conditionTextField = document.querySelector('.condition-text');
const conditionIconLargeField = document.querySelector('.condition-icon-large');
const temperatureField = document.querySelector('.temperature');
const humidityField = document.querySelector('.humidity');
const precipitationField = document.querySelector('.precipitation');
const pressureField = document.querySelector('.pressure');
const windField = document.querySelector('.wind');


// Listen for form submit then run the search function
form.addEventListener('submit', searchForLocation);

const fetchResponse = async (targetLocation) => {
    // Set url
    let currentUrl = `http://api.weatherapi.com/v1/current.json?key=cc1bfda95c5349db9b5144811232705&q=${targetLocation}&aqi=no`;
    // Fetch data from API and convert it to JSON
    const res = await fetch(currentUrl)
    const jsonData = await res.json()
    // Set variables to pass the JSON data
    let locationName = jsonData.location.name
    let locationCountry = jsonData.location.country
    let conditionText = jsonData.current.condition.text
    let conditionIconLarge = (jsonData.current.condition.icon).replace('64x64', '128x128')
    let temperature = Math.ceil(jsonData.current.feelslike_c)
    let humidity = jsonData.current.humidity
    let precipitation = jsonData.current.precip_mm
    let pressure = jsonData.current.pressure_mb
    let wind = Math.ceil(jsonData.current.wind_mph)
    // Call function to update the weather details in the HTML
    updateDetails(locationName, locationCountry, conditionText, conditionIconLarge, temperature, humidity, precipitation, pressure, wind)

    // Log to check JSON data
    console.log(jsonData)
}

// Function to update the details in HTML
function updateDetails(locationName, locationCountry, conditionText, conditionIconLarge, temperature, humidity, precipitation, pressure, wind,) {
    locationNameField.innerText = locationName
    locationCountryField.innerText = locationCountry
    conditionTextField.innerText = conditionText
    conditionIconLargeField.src = conditionIconLarge
    temperatureField.innerText = temperature
    humidityField.innerText = humidity
    precipitationField.innerText = precipitation
    pressureField.innerText = pressure
    windField.innerText = wind
}

// Function to search for location and fetch JSON data
function searchForLocation(e) {
    e.preventDefault()
    target = searchField.value
    fetchResponse(target)
}

fetchResponse(target)