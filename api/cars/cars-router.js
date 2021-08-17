const carsModel = require("./cars-model");
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require("./cars-middleware");

const router = require("express").Router();

router.get("/",async(req,res,next)=>{
    try{
        const cars = await carsModel.getAll();
        res.status(200).json(cars);
    }
    catch(err){
        next(err);
    }
});
router.post("/",checkCarPayload,checkVinNumberValid,checkVinNumberUnique,async(req,res,next)=>{
    try{
        const ids = await carsModel.create(req.body);
        const car = await carsModel.getById(ids[0]);
        if(!car){
            next(new Error("cannot create record"));
        }
        res.status(201).json(car);
    }
    catch(err){
        next(err);
    }
});
router.get("/:id",checkCarId,(req,res,next)=>{
    try{
        res.status(200).json(req.data.car);
    }
    catch(err){
        next(err);
    }
});
module.exports = router;