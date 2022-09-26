const {Country,Activity} = require("../db");
const axios = require("axios");
const {Op}= require('sequelize')

const postActivity=async(req,res,next)=>{
    
      const { name,dificulty,duration,season,countriesName }= req.body
      try {
      if(name&&dificulty&&duration&&season&&countriesName){
        const activity={
          name,
          dificulty,
          season,
          duration,
        }
        let createdActivity = await Activity.create(activity)
        let infoCountriesName= await Country.findAll({
          where:{
            name:{
              [Op.in]:countriesName
            }
          }}
        )
        infoCountriesName?.map(m=>m.addActivity(createdActivity))

        if(createdActivity)res.json({message:"Actividad creada correctamente",data:createdActivity})
        else res.json({message:"Error no se obtuvieron todos los datos correspondientes"})
      }
        } catch (error) {
            next(error)
        }
}


module.exports={
    postActivity
}