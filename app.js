const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){

const firstName = req.body.fName ;
const lastName = req.body.lName;
const email = req.body.email;

var data = {
  members:[
    {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME : firstName ,
        LNAME : lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us7.api.mailchimp.com/3.0/lists/68de8e95fe"

const options = {
  method:"POST",
  auth: "Jeff:b7a316e46a480576fbd75b4341d398fd-us7"
}

const request = https.request( url, options, function(response){

if(response.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
}else{
  res.sendFile(__dirname + "/failure.html");
}

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })

})

request.write(jsonData);
request.end();


});

app.post("/success",function(req,res){
  res.redirect("/");
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on Port 3000!!!");
});
//API KEY
// b7a316e46a480576fbd75b4341d398fd-us7

//List idea
// 68de8e95fe
