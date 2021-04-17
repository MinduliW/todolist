const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

app.set('view engine', 'ejs');

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {

  const day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems : items
  });

  //res.sendFile(__dirname + "/signup.html");

  //res.send("Server is up and running!");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server running")
});

app.post("/", function(req,res){
  const item = req.body.newItem;

  if (req.body.list=== "Work"){
    workItems.push(item);
    res.redirect("/work");

  }
  else{
    items.push(item);
    res.redirect("/");
  }


  console.log(item);

})
app.get("/work", function(req, res){
  res.render("list", {listTitle:"Work List", newListItems:workItems});
});


app.get("/about", function(req, res){
  res.render("about");
});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})
