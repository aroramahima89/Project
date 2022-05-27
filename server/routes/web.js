const router = require("express").Router();
const { User } = require("../models/user");

router.get("/",async(req,res)=>{
    try{
        const {data} = await User.find({domain:"WebDev"});
        if(!data){
            console.log("no data");
           res.status(401).send({message:"No user yet!"});
        }
        res.status(200).send(data);
     }
     catch(err){
        console.log(err);
        res.status(400).send(err);
     }
})

module.exports = router;