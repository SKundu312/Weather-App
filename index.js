const http=require('http')
const fs = require('fs')
var requests = require('requests');
const homeFile = fs.readFileSync('home.html', 'utf-8')

const replaceVal= (tempVal,orgVal)=>{
      let tempe=tempVal.replace("{%tempval%}",orgVal.main.temp)
       tempe=tempe.replace("{%tempmin%}",orgVal.main.temp_min)
       tempe=tempe.replace("{%tempmax%}",orgVal.main.temp_max)
       tempe=tempe.replace("{%location%}",orgVal.name)
       tempe=tempe.replace("{%country%}",orgVal.sys.country)
       console.log(tempe)
    return tempe;
}

const server=http.createServer(async (req,res)=>{
    if(req.url=='/')
    {
        var newData="";
        requests('https://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid=1a71fddaaef8394e60023c71f6691706')
            .on('data', async function (chunk) {
                res.setHeader('Content-Type', 'text/html');
                var parsed = JSON.parse(chunk);
                newData += replaceVal(homeFile, parsed);

            })
            .on('end', function (err) {
                res.end(newData);
                if (err) return console.log('connection closed due to errors', err);
                
                console.log('end');
            });
        

    }
})

server.listen(8000)