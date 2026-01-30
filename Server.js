
let express = require("express");
let fs = require("fs").promises;


let app = express();
let Port = 5000;

app.use(express.json());

function validation (req, res, next){
let {ID, Name, Rating, Description, Genre, Cast} = req.body;

let errors = [];

if(typeof ID !== "number"){
    errors.push("ID should be number");
    
}
if(typeof Name !== "string"){
    errors.push("Name should be string");
    
}
if(typeof Rating !== "number"){
    errors.push("Rating should be number");
    
}
if(typeof Description !== "string"){
    errors.push("Description should be string");
    
}
if(typeof Genre !== "string"){
    errors.push("Genre should be string");
    
}
if(!Array.isArray(Cast)){
    errors.push("Cast should be array");
}else{
    let invalidCast = Cast.filter(v => typeof v !== "string")

    if(invalidCast.length > 0){
        errors.push("Cast should be an array of strings" );
    }
}

if(errors.length > 0){
    return res.status(400).json({message : "some data is incorrect.",errors});
}

next();
}


app.post("/post", validation, async (req, res) => {
    try{
        let data = await fs.readFile("./db.json" , "utf-8");
        let result = JSON.parse(data);

        result.push(req.body);

        await fs.writeFile("db.json", JSON.stringify(result, null , 2));

        res.json({message: "Data add successfully", success : true});
    }catch(e){
        res.json({message: e.message, success : false});

    }
})







app.use((req,res)=>{
    res.status(404).json({error:"404 not found" });
})


app.listen(Port, ()=>{
    console.log("Port is runnig at 5000")
})