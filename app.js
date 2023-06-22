const express=require('express');
const https=require('https');
const app=express();
const bodyParser=require('body-parser');

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apikey="72d7f28763376cebdb6854b201e9d069";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherdescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const cityname=req.body.cityName;
            const imageurl="http://www.openweathermap.org/img/wn/" + icon + "@2x.png";
            // res.write("<p>The weather is currently " + weatherdescription + ".<p>");
            // res.write("<p>The temperature in " + req.body.cityName + " is " + temp + " degrees Celcius.<p>");
            // res.write("<img src=" + imageurl + ">");
            // res.send();
            res.render("success",{imageurl:imageurl,weatherdescription:weatherdescription,temp:temp,cityname:cityname});
        });
    });
});

app.listen(3000,function(){
    console.log("The server is running on port 3000.");
});