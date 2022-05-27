require("dotenv").config();
const express = require('express');
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const cors=require("cors");
const app=express();
require('./db/conn');
const { User,validate } = require("./models/User");

/*const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const webRoutes= require("./routes/web");
const appRoutes= require("./routes/app");
const dsaRoutes= require("./routes/dsa");
const dsaJavaRoutes= require("./routes/dsaJava");
const dataScienceRoutes= require("./routes/dataScience");
*/

//middlewares
app.use(express.json());
app.use(cors());

// routes
/*
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/web",webRoutes);
app.use("/api/app",appRoutes);
app.use("/api/dsa",dsaRoutes);
app.use("/api/dsaJava",dsaJavaRoutes);
app.use("/api/dataScience",dataScienceRoutes);
*/

const PORT=process.env.PORT||8080;

app.post("/login", async (req, res) => {
	try {
		const { error } = valid(req.body);
		console.log("xxxx");
		if (error)
			return res.status(400).send({ message: error.details[0].message });
		console.log("aaa");
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });
		console.log("vvvv");
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		console.log("cccc");
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
		console.log("ffff");
		try{
			const token = user.generateAuthToken();
		}
		catch(err){
			console.log(err);
		}
		
		console.log("fxsx");
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const valid= (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};


app.post("/signup", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


app.get("/web",async(req,res)=>{
   try{
      const {data} = await User.find({domain:"WebDev"});
      if(!data){
         res.status(401).send({message:"No user yet!"});
      }
      res.status(200).send(data);
   }
   catch(err){
      console.log(err);
      res.status(400).send(err);
   }
})


app.get("/app",async(req,res)=>{
  try{
    const {data} = await User.find({domain:"AppDev"});
    if(!data){
       res.status(401).send({message:"No user yet!"});
    }
    res.status(200).send(data);
 }
 catch(err){
    console.log(err);
    res.status(400).send(err);
 }
})

app.get("/dsa",async(req,res)=>{
  try{
    const {data} = await User.find({domain:"Dsa"});
    if(!data){
       res.status(401).send({message:"No user yet!"});
    }
    res.status(200).send(data);
  }
  catch(err){
    console.log(err);
    res.status(400).send(err);
  }
})

app.get("/dsaJava",async(req,res)=>{
  try{
    const {data} = await User.find({domain:"DsaJava"});
    if(!data){
       res.status(401).send({message:"No user yet!"});
    }
    res.status(200).send(data);
  }
  catch(err){
    console.log(err);
    res.status(400).send(err);
  }
})

app.get("/dataScience",async(req,res)=>{
  try{
    const {data} = await User.find({domain:"Data Science"});
    if(!data){
       res.status(401).send({message:"No user yet!"});
    }
    res.status(200).send(data);
  }
  catch(err){
    console.log(err);
    res.status(400).send(err);
  }
})


/*
app.get("/",(req,res)=>{
    console.log("home");
    res.send("home");
})

app.post("/signup",(req,res)=>{
  const {name,password}=req.body;
  if(!name || !password){
    console.log("Plz fill the fields properly");
    return res.status(400).json({error:"Plz fill the fields properly.."});
  }
    try{
        const userExist=await User.findOne({name:name});
  
        if(userExist){
          console.log("UserName already exists");
          return res.status(400).json({error:"UserName already exists.."});
        }
        else{
            user=new User({name,password});
            userRegister=await user.save();
    
            console.log(`${user} registeration successful`);
            res.status(201).json("registeration successful");
        }
   }
   catch(err){
       console.log(err);
         res.status(400).json({error:`server error ${err}`});
   }
})

app.post("/login",(req,res)=>{

})
*/
app.listen(PORT,()=>{
    console.log("server started");
})