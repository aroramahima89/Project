const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://aroramahima89:Mahima89@cluster0.dcmob.mongodb.net/Project",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connected to db successfully");
})
.catch((err)=>{
     console.log(err); 
    console.log("could not connect to db");
})


/*
try{
    mongoose.connect("mongodb+srv://aroramahima89:Mahima89@cluster0.e6uwy.mongodb.net/Pro",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then
    console.log("Connected to db successfully");
}
catch(err){
    console.log(err);
    console.log("could not connect to db");
}
*/