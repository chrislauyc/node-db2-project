const db = require("../../data/db-config");
const getAll = () => {
  return db("cars"); //rows
}

const getById = (id) => {
  return db("cars").where({id}).first(); //row
}

const create = (car) => {
  return db("cars").insert(car); //counts
}
const getByVin=(vin)=>{
  return db("cars").where({vin}).first();
}
module.exports = {
  getAll,
  getById,
  create,
  getByVin
}
