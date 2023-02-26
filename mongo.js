const express = require("express");

const ejs= require("ejs")

const mongoose = require("mongoose");

const app = express();
app.use(express.static('css'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")
const Blog = require("./models/blog");
const { where } = require("./models/blog");
// const dbUrl = 'mongodb+srv://Verygood:1234@Nodetuts.m1js9b3.mongodb.net/Crud_data?retryWrites=true&w=majority'
const dbUrl = 'mongodb://127.0.0.1:27017/very_mongo_start'
mongoose.set("strictQuery", true);

mongoose.connect(dbUrl,
  //   {k
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
)
  .then(() => {
    console.log("MongoDB connection established successfully.");
    app.listen(3000, () => {
      console.log("Server started on port 3000.");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// these are the codes to insert documents into the collection

app.post("/add-doc", (req, res) => {
  const firstdoc = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body
  }
  )
  firstdoc.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log("Faced an error", err))
  res.redirect("/")

})


//this is the api to help us to see some data inserted into the collection

app.get("/see-doc", (req, res) => {
Blog.find()
.then((result)=>res.send(result))
.catch((err)=> console.log(err))
})

// this  is an api that is used when you want to get the single document from the correction

app.get("/single",(req,res)=>{
  Blog.findById('')
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>res.send(err))
})

//this is an api that i am going to displaying data in the database to the frontend page
app.get("/",(req,res)=>{
  Blog.find()
  .then((results)=>{
    res.render('mongo',{title:"This is displaying data in mongo db to the page",datas:results})

  })
  .catch((err)=>res.send(err))
})
//this is to direct to the page that that allows you to input data

app.get("/add",(req,res)=>{
  res.render("form",{title:"This is the data to inset in mongodb"})
})

//rendering a delete page
app.get("/delete",(req,res)=>{
  res.render("delete",{title:"Drag the title that you want to delete from the database here"})
})

// this all about final deleting

app.post("/deleting",(req,res)=>{
  const dataTodelete= req.body.delete
Blog.deleteMany({title:dataTodelete})
.then(()=>res.redirect("/"))
.catch((err)=>console.log("Faced an error",err))

})

// rendering update page
app.get("/update",(req,res)=>{
  res.render("update",{title:"Enter the title to update"})
})

// this is an api to finallly update the provided title

app.post("/updating",(req,res)=>{
  const datatoUpdate= req.body.titletoUpdate
Blog.replaceOne({title:datatoUpdate},({title:req.body.New_title,snippet:req.body.New_snippet,body:req.body.New_body}))
.then(()=>res.redirect("/"))
.catch(()=> console.log("Faced an error",err))
});