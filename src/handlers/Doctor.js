const { Hospital, Doctor } = require('../models')

const addDoctor = async (req, res) => {
  const { hospital: hospitalId } = req.body
  const hospital = await Hospital.findById(hospitalId).exec()

  const newDoctor = new Doctor(req.body)

  hospital.doctors.push(newDoctor)

  await newDoctor.save()
  await hospital.save()

  res.status(200).json(newDoctor)
}

const getDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params._id).populate('hospital').populate('appointments').exec()

  res.status(200).json(doctor)
}

module.exports = {
  getDoctor,
  addDoctor
}