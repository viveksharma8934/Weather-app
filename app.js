const express = require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app =express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  var city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=ecd2158bee67bade6b9218e38b9faafb&units=metric"
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherdata = JSON.parse(data);
      const temp=weatherdata.main.temp;
      const icon=weatherdata.weather[0].icon;
      const weatherdescription=weatherdata.weather[0].description;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1> The temperature in "+city+" is "+ temp + " degree celsius</h1>")
      res.write("<h2>The weather is currently "+weatherdescription+"</h2>")
      res.write("<img src="+imageURL+">")
      res.send()
    })
  })
});

app.listen(3000,function(){
  console.log("Server is running on port 3000")
});
