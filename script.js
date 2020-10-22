// Define all variables
var cityCurrent = $(".city");
var dateCurrent = $(".date");
var cityList = $(".city-list");
var iconHeader = $(".icon-header");
var mainCardTemp = $(".main-card-temp");
var mainCardHumidity = $(".main-card-humidity");
var windSpeed = $(".wind-speed");
var uvIndex = $(".uv-index");
var m = moment();
console.log(moment().format("dddd MMMM Do YYYY"));

var cityLists = JSON.parse(localStorage.getItem("city")) || {}

var cityDate = cityCurrent + dateCurrent

// When they type in the search bar, need to take their input, prevent default, save to localstorage and put it in the URL query for API pull
$("#searchBtn").on("click", searchCity);


function searchCity(event) {
    event.preventDefault();
    var citySearched = $("#citySearched").val();
    localStorage.setItem("city", JSON.stringify(cityLists))
    console.log(citySearched);
    $("ul").prepend("<li class='list-group-item'>" + citySearched + "</li>");
    $("div").removeClass("d-none");
}

// After click, prepend search input to the card


// After click, put city they pulled on the card on the right with todays date


// populate the 5 day forecast in the cards below


// this needs to function on every search input