// let weather=document.getElementById('weathercon')
const tempStatus='Clouds';
curDate = document.getElementById('date')

getCurrentDay=()=>{
	d = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // console.log(days[d.getDay()])
    var monNo=d.getMonth();
    var date=d.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // console.log(months[monNo])
    let hrs=d.getHours();
    let mins=d.getMinutes();
    let periods="AM";
	let year=d.getFullYear();
	let sec=d.getSeconds();

    if(hrs>12) {
        hrs-=12;
        periods="PM";
    }
    else if(hrs==12) {
		periods="PM";
	}
    if(mins<10) {
		mins="0"+mins;
	}
	return `${days[d.getDay()]} | ${months[monNo]} ${date}, ${year} | ${hrs}:${mins}:${sec} ${periods}`
}

setInterval(() => {
	curDate.innerHTML = getCurrentDay();
},1000)


// Weather integration

let weather = {
    "apiKey": "1a71fddaaef8394e60023c71f6691706",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&units=metric&appid="
        + this.apiKey)
        .then(response => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const {icon, description} = data.weather[0]
        const {name} = data
        const {country} = data.sys
        const {temp, temp_min, temp_max, feels_like, humidity} = data.main
        const {speed} = data.wind
        // console.log(icon, name, country, temp, temp_min, temp_max)
        
        document.getElementById("weathercon").src = "http://openweathermap.org/img/wn/" + icon + "@4x.png"
        document.getElementById("desc").innerHTML = description
        document.getElementById("location").innerHTML = name
        document.getElementById("country").innerHTML = country
        document.getElementById("temp").innerHTML = temp
        document.getElementById("min-temp").innerHTML = temp_min
        document.getElementById("max-temp").innerHTML = temp_max
        document.getElementById("feels").innerHTML = feels_like
        document.getElementById("humidity").innerHTML = humidity
        document.getElementById("speed").innerHTML = speed
        document.querySelector(".info").classList.remove("dummy")

    },
    search: function() {
        this.fetchWeather(document.getElementById("searchbar").value)
    }
}

searchBtn = document.getElementById('search-btn')
searchBar = document.getElementById('searchbar')

searchBtn.addEventListener('click', () => {
    weather.search()
})

searchBar = addEventListener('keyup', (event) => {
    if(event.key == "Enter") {
        weather.search()
    }
})

weather.fetchWeather("Petaling Jaya")

// const http = require('http')
// const fs = require('fs')
// var requests = require('requests');
// const homeFile = fs.readFileSync('../index.html', 'utf-8')

// const replaceVal= (tempVal,orgVal)=>{
//       let tempe=tempVal.replace("{%tempval%}",orgVal.main.temp)
//        tempe=tempe.replace("{%tempmin%}",orgVal.main.temp_min)
//        tempe=tempe.replace("{%tempmax%}",orgVal.main.temp_max)
//        tempe=tempe.replace("{%location%}",orgVal.name)
//        tempe=tempe.replace("{%country%}",orgVal.sys.country)
//        console.log(tempe)
//     return tempe;
// }

// const server=http.createServer(async (req,res)=>{
//     if(req.url=='/')
//     {
//         var newData="";
//         requests('http://api.openweathermap.org/data/2.5/weather?q=Kanpur&units=metric&appid=45b11607ce8aa9c3a54c0a355e420441')
//             .on('data', (chunk) => {
//                 const objdata=JSON.parse(chunk)
//                 const arrData = [objdata]
//                 const realTimeData = arrData
//                     .map((data) => replaceVal(homeFile, data))
//                     .join("")
//                 res.write(realTimeData)
//                     // console.log(realTimeData)
//                 // console.log(arrData)
//                 // res.setHeader('Content-Type', 'text/html');
//                 // var parsed = JSON.parse(chunk);
//                 // newData += replaceVal(homeFile, parsed);

//             })
//             .on('end', (err) => {
//                 if (err) return console.log('connection closed due to errors', err);
//                 res.end(newData);
                
//                 // console.log('end');
//             });
//     }
// })

// server.listen(8000, "127.0.0.1")