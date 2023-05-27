const express = require("express");
const nodemailer = require('nodemailer');
const app = express();

const bp = require("body-parser");
const { urlencoded } = require("body-parser");
app.use(express.static("public"));
app.use(urlencoded({
    extended : true
}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.get("/index.html",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.get("/login.html",function(req,res){
    res.sendFile(__dirname+"/login.html");
});
app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
});
app.get("/shop.html",function(req,res){
    res.sendFile(__dirname+"/shop.html");
});
app.get("/Checkout.html",function(req,res){
    res.sendFile(__dirname+"/Checkout.html");
})
// app.post("/login",function(req,res){
//     res.sendFile(__dirname+"/login.html");
// });
app.get("/cart.html",function(req,res){
    res.sendFile(__dirname+"/cart.html");
});

app.post("/access",function(req,res){
   var name = req.body.fname;
   var email = req.body.email;
   var password = req.body.pwd;

   if(name == "Rishi" && email == "rishi@gmail.com" && password == "Rishi"){
    res.sendFile(__dirname+"/shop.html");
   }
   else{
    res.send("<h1>Incorrect Login Details Please Check</h1>");
   }
});

app.post("/sent", async(req,res)=>{
    
    var addq = req.body.subs;
    var emailq = req.body.emails;

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    service: 'gmail',
    auth: {
      user: 'vivekmalla123@gmail.com',
      pass: 'nztvmttogtgpjvno'
    }
  })
  let info = transporter.sendMail({
    from: 'vivekmalla123@gmail.com',
    to: emailq,
    subject: 'Order Placed Successfully',
    text: "PLease check with your address Address:"+addq+" If any Changes mail to the support@rishi.com. Dear"+emailq+", Thank you for giving us your trust! We have just confirmed you received your order, and hope you are enjoying your Paintings. Every item is handmade by our team, with care to the details, so we can always provide you with the best experience."
  })

    res.sendFile(__dirname+"/support.html");


});
  
app.listen(process.env.PORT || 3981,function(){
    console.log("server running");
});