const express = require("express")
const carsRouter = require("./cars/cars-router");
const server = express()

server.use(express.json());
server.use("/api/cars",carsRouter);
server.use((err,req,res,next)=>{
    try{
        res.status(500).json({message:err.toString()});
    }
    catch{
        try{
            res.status(500).json({message:err.message});
        }
        catch{
            res.status(500).json({message:"internal server error"});
        }
    }
});

module.exports = server
