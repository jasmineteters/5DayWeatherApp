// Define all variables
var cityCurrent = $("#city");
var cityList = $("#city-list");
var iconHeader = $("#icon-header");
var mainCardTemp = $("#main-card-temp");
var mainCardHumidity = $("#main-card-humidity");
var windSpeed = $("#wind-speed");
var uvIndex = $("#uv-index");
var m = moment();
console.log(moment().format("dddd, MMMM Do, YYYY"));

var tempCards = $("#temp1") + $("#temp2") + $("#temp3") + $("#temp4") + $("#temp5")
var iconCards = $("#icon1") + $("#icon2") + $("#icon3") + $("#icon4") + $("#icon5")
var humidityCards = $("#humidity1") + $("#humidity2") + $("#humidity3") + $("#humidity4") + $("#humidity5")

var clearCards = tempCards + iconCards + humidityCards


var cityLists = JSON.parse(localStorage.getItem("city"));

// When they type in the search bar, need to take their input, prevent default, save to localstorage and put it in the URL query for API pull

$("#searchBtn").on("click", searchCity);

$("#click-me").on("click", cityClickList);

function cityClickList(event) {
    event.preventDefault();
    console.log("is this working")
    // Make sure cards are empty
    $(clearCards).empty();
    clickSearch = $("#click-me").val()

}


function searchCity(event, clickSearch) {
    // Prevent default
    event.preventDefault();


    // Capture the value of the user input
    var citySearched = $("#citySearched").val();
    // Save to localstorage
    localStorage.setItem("city", JSON.stringify(cityLists));
    // log it
    console.log(citySearched);
    // add new LI with the users input
    $("ul").prepend(
        "<button class='list-group-item text-left' id='click-me'>" + citySearched + "</button>"
    );
    // Un-hide the cards for input.
    $("div").removeClass("d-none");
    cityCurrent.text(citySearched + " (" + m.format("MM/DD/YY") + ")");

    // API SECTION
    // My API key
    var APIKey = "c831e4f1fa8b94822afc4adb180c1af6";

    // Here we are building the URL we need to query the database
    var queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        citySearched +
        "&appid=" +
        APIKey;

    // AJAX call to the OpenWeatherMap API
    $.ajax({
            url: queryURL,
            method: "GET",
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Arrays for the loops
            var temp = [];
            var humid = [];
            var icons = [];

            // For loop to put into the array

            for (let i = 0; i < response.list.length; i = i + 8) {
                var tempF = Math.round(
                    (response.list[i].main.temp - 273.15) * 1.8 + 32
                );
                temp.push(tempF);
                mainCardTemp.text("Temperature: " + tempF + "°F");

                var humidity = response.list[i].main.humidity;
                humid.push(humidity);
                mainCardHumidity.text("Humidity: " + humidity + "%")

                var windSpeedNow = response.list[i].wind.speed;
                windSpeed.text("Wind Speed: " + windSpeedNow + "mph")

                var icon = response.list[i].weather[0].icon;
                icons.push(icon);
            }
            // For loop to put arrays into the cards
            for (let i = 0; i < temp.length; i++) {
                $(`#temp${i + 1}`).text(`Temperature: ${temp[i]}°F`);

                $(`#humidity${i + 1}`).text(`Humidity: ${humid[i]}%`);

                $(`#icon${i + 1}`).append(
                    `<img src='http://openweathermap.org/img/w/${icons[i]}.png'>`
                );

                // This adds the date to the day cards
                $("#day1").text(moment().format("MM/DD/YY"));
                $("#day2").text(moment().add(1, "days").format("MM/DD/YY"));
                $("#day3").text(moment().add(2, "days").format("MM/DD/YY"));
                $("#day4").text(moment().add(3, "days").format("MM/DD/YY"));
                $("#day5").text(moment().add(4, "days").format("MM/DD/YY"));
            }

            // UV index is a secondary call
            var lat = response.city.coord.lat;
            var lon = response.city.coord.lon;
            var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
            //New call for the UV index information
            $.ajax({
                url: queryURLUV,
                method: 'GET'
            }).then(function (response) {

                var uvlresults = response.value;


                uvIndex.text("UV Index: " + uvlresults)
                // Changing color depending on the Index level
                if (uvlresults < 5) {
                    uvIndex.addClass("btn btn-success")
                } else {
                    uvIndex.addClass("btn btn-danger")
                }

            });
        });
};