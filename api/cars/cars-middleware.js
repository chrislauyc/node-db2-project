const {getById, getByVin}  = require("./cars-model");
const vinValidator = require("vin-validator");
const checkCarId = async(req, res, next) => {
  try{
    const car = await getById(req.params.id);
    if(!car){
      res.status(404).json({message: `car with id ${req.params.id} is not found`});
    }
    req.data = {car};
    next();
  }
  catch(err){
    next(err);
  }
}

const checkCarPayload = (req, res, next) => {
  try{
    const {vin,make,model,mileage,title,transmission} = req.body;
    if(vin === undefined || typeof(vin) !== "string"){
      return res.status(400).json({message:"vin is missing"});
    }
    if(make === undefined || typeof(make) !== "string"){
      return res.status(400).json({message:"make is missing"});
    }
    if(model === undefined || typeof(model) !== "string"){
      return res.status(400).json({message:"model is missing"});
    }
    if(mileage === undefined || typeof(mileage) !== "number"){
      return res.status(400).json({message:"mileage is missing"});
    }

    if(title !== undefined && typeof(title) !== "string"){
      return res.status(400).json({message:"title must be a string"});
    }

    if(transmission !== undefined && typeof(transmission) !== "string"){
      return res.status(400).json({message:"transmission must be a string"});
    }
    next();
  }
  catch(err){
    next(err);
  }
}

const checkVinNumberValid = (req, res, next) => {
  try{
    const {vin} = req.body;
    if(!vinValidator.validate(vin)){
      return res.status(400).json( {message: `vin ${vin} is invalid`});
    }
    next();
  }
  catch(err){
    next(err);
  }
}

const checkVinNumberUnique = async(req, res, next) => {
  try{
    const car = await getByVin(req.body.vin);
    if(car){
      return res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    }
    next();

  }
  catch(err){
    next(err);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
