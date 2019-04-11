var bodyparser  = require("body-parser"),
methodOverride = require("method-override"),
mongoose        = require("mongoose"),
express         = require("express"),
app             = express();
mongoose.connect("mongodb://localhost:27017/BlogApp", {
  useNewUrlParser: true
});

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended : true}));
app.use(methodOverride("_method"));

var topx= new mongoose.Schema({
  title : String ,
  image : String ,//{ type: String , default: placeholderimage.jpg} ,
  desc : String ,
  status : Number ,
  created : { type: Date , default: Date.now}
});

var topC = new mongoose.model("topC",topx);

app.get("/",function(req,res){
	topC.find(function(err,topC)
  {
    if(err){
      console.log(err);
    }else{
      res.render("index",{topC:topC});
    }
  });
});
app.get("/new",function(req,res){
  res.render("new");
});
app.get("/solved",function(req,res){
  topC.find({status:1},function(err,topy){
  if(err){
    console.log(err);
  }else{
  res.render("solved",{topy:topy});
  }
  });
});
app.get("/unsolved",function(req,res){
  topC.find({status:0},function(err,topx){
  if(err){
    console.log(err);
  }else{
  res.render("unsolved",{topx:topx});
  }
});
});

app.post("/new",function(req,res){
  var title = req.body.title;
  var image = req.body.image;
  var desc = req.body.desc
  var newblog = {
    title: title,
    image: image,
    desc: desc,
    status : "0"
  };
  topC.create(newblog,function(err,newblog) {
     if(err){
       console.log(err);
     }else{
       console.log(newblog);
        res.redirect("/");
     }
  });
});

app.get("/detail/:id",function(req,res){
  topC.findById(req.params.id,function(err,yes){
    if(err){
      console.log(err);
    }else{
      res.render("detail",{yes:yes});
    }
  });
});

app.get("/edit/:id", function(req,res){

  topC.findById(req.params.id,function(err,no){
    if(err){
      console.log(err);
    }else{
      res.render("edit", {no:no});
    }
  })
});

app.put("/edit/:id" , function( req , res){
    topC.findByIdAndUpdate(req.params.id ,req.body.a, function(err,update){
      if(err){
        console.log(err);
      }else{
        res.redirect("/");
      }
    });
});

// var newblog = {
//     title: "Test3",
//     image: "3.jpg"
//   };
//   topC.create(newblog,function(err,topC) {
//      if(err){
//        console.log(err);
//      }else{
//        console.log(topC);
//      }
//   });
app.listen( //process.env.PORT , process.env.IP
  3000, function(){
  console.log("Server Linked to AWS");
});
