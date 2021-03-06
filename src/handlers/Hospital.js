const { Hospital } =require('../models')

const createHospital = async (req, res) => {
  const { name, location } = req.body
  const newHospital = new Hospital({ name, location })
  await newHospital.save()

  res.status(200).json(newHospital)
}

const getHospital = async (req, res) => {
  const { _id } = req.params

  const hospitalDetails = await Hospital.findById(_id).populate('doctors').exec()
  res.status(200).json({ hospital: hospitalDetails})
}

const getAllHospitals = async (req, res) => {
  const { _id } = req.params

  const hospitalDetails = await Hospital.find().populate('doctors').exec()
  res.status(200).json({ hospitals: hospitalDetails})
}

module.exports = {
  createHospital,
  getHospital,
  getAllHospitals
}