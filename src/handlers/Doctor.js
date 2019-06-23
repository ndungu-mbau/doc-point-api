const { Hospital, Doctor } = require('../models')

const addDoctor = async (req, res) => {
  const { hospitalId, doctor } = req.body
  const hospital = await Hospital.findById(hospitalId).exec()

  const newDoctor = new Doctor({...doctor, hospital: hospital._id})
  await newDoctor.save()

  hospital.doctors.push(newDoctor)
  await hospital.save()

  res.status(200).json(newDoctor)
}

const getDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params._id).exec()

  res.status(200).json(doctor)
}

module.exports = {
  getDoctor,
  addDoctor
}