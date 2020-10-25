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

var cityLists = JSON.parse(localStorage.getItem("city"));

var cityDate = cityCurrent + dateCurrent

// When they type in the search bar, need to take their input, prevent default, save to localstorage and put it in the URL query for API pull



$("#searchBtn").on("click", searchCity);


function searchCity(event) {
    // Prevent default
    event.preventDefault();

    // Capture the value of the user input
    var citySearched = $("#citySearched").val();

    // Save to localstorage
    localStorage.setItem("city", JSON.stringify(cityLists))

    // log it
    console.log(citySearched);

    // add new LI with the users input
    $("ul").prepend("<li class='list-group-item click-me'>" + citySearched + "</li>");

    // Un-hide the cards for input. 
    $("div").removeClass("d-none");

    // run function to add input to the fields

    // API SECTION
    // My API key
    var APIKey = "c831e4f1fa8b94822afc4adb180c1af6";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearched + "&appid=" + APIKey;

    // AJAX call to the OpenWeatherMap API
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            var temp = [];
            var humid = [];
            var icons = [];


            console.log(response)

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object





            for (let i = 0; i < response.list.length; i = i + 8) {
                var tempF = Math.round((response.list[i].main.temp - 273.15) * 1.80 + 32);
                temp.push(tempF)

                var humidity = (response.list[i].main.humidity);
                humid.push(humidity)

                var icon = (response.list[i].weather[0].icon);
                icons.push(icon)


            };


            for (let i = 0; i < temp.length; i++) {
                $(`#temp${i+1}`).text(`Temperature: ${temp[i]}°F`);

                $(`#humidity${i+1}`).text(`Humidity: ${humid[i]}%`);

                $(`#icon${i+1}`).append(`<img src='http://openweathermap.org/img/w/${icons[i]}.png'>`);
            }




        })
};





// After click, prepend search input to the card


// After click, put city they pulled on the card on the right with todays date


// populate the 5 day forecast in the cards below


// this needs to function on every search input