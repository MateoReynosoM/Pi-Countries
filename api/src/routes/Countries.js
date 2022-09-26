const { Router } = require ('express')
const { getCountries, getCountryById }= require ('../controllers/Country.controller.js')
const router = Router()
const axios = require('axios')


router.get('/',getCountries)

router.get('/:id',getCountryById)




module.exports= router