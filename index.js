const express = require("express");
const { default: mongoose } = require("mongoose");
// const mongoose = require("mongoose");
const cors = require("cors");
// const UserModel = require("./Model/Users");
const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());
const UserSchema = new mongoose.Schema({
    name:{
    type:String,
  },
  email:{
    type: String,
  },
  age:{
    type : Number ,
  },
});

mongoose.connect('mongodb://127.0.0.1:27017/crud')
.then(()=>{
  console.log("db connect");
})
.catch((error)=>{
console.log(error);

});

// app.post("/createUser ", async(req, res) => {
 
//   UserModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(err => res.json(err));
// });

const User =mongoose.model("User",UserSchema);


app.get('/',(req,res)=>{
  UserModel.find({})
  .then(users => res.json(users))
  .catch(err => res.json(err))
})

// app.get("/",(req,res) =>{
//   req.send("serv on h");

// })

app.get('/getUser/:id' ,(req,res)=>{
  const id=req.params.id;
  UserModel.findById(_id)
  .then(user=>res.json(user))
  .catch(err=>res.json(err))
})

app.post("/createUser" ,async(req,res)=>{
  try{
    const bodyData =req.body;
    const user = new User(bodyData);
    const userData= await user.save();
    res.send(userData);
  }

  catch(error){
    res.send(error);
  }
  
});


app.get("/readall",async(req,res)=>{
  try{
    const userData = await User.find({});
    res.send(userData);
  }catch(error)
  {
    res.send(error);
  }
})

app.get("/read/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    const user = await User.findById({_id:id});
    res.send(user);

  }
  catch(error)
  {
    res.send(error);
  }
});


app.put("/updateD/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    const user = await User.findByIdAndUpdate({_id:id},req.body,{new:true});
    res.send(user);
  }
  catch(error){
res.send(error);

  }
});

app.delete("/delete/:id",async(req,res)=>{
  try{

    const id=req.params.id;
    const user = await User.findByIdAndDelete({_id:id});
    res.send(user);

  }
  catch(error)
  {
    req.send(error);
  }
})

app.listen(port, () => {
  console.log(`server started on ${port}  http://localhost:${port}`);
});
