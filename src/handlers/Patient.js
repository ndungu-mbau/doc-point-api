const { Patient } = require('../models')

const addPatient = async (req, res) => {
  const newPatient = new Patient(req.body)

  await newPatient.save()
  res.status(200).json(newPatient)
}

const getDetails = async (req, res) => {
  const patient = await Patient.findById(req.params._id).populate('appointments').exec()

  res.status(200).json(patient)
}

module.exports = {
  addPatient,
  getDetails
}