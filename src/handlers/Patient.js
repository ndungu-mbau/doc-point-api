const { Patient } = require('../models')
const bcrypt = require('bcrypt') 

const salt = bcrypt.genSaltSync(10)

const addPatient = async (req, res) => {
  const { name, contact, password } = req.body

  console.log({ name, contact, password })

  const newPassword = bcrypt.hashSync(password, salt)
  const newPatient = new Patient({ name, contact, password:newPassword })

  await newPatient.save()
  res.status(200).json(newPatient)
}

const login = async (req, res) => {
  const { contact, password } = req.body

  const patient = await Patient.findOne({ contact: contact }).exec()

  if(!patient){
    res.status(401).json({ message: 'No user found', ok: false})
  }

  const success = await bcrypt.compare(password, patient.password)

  if(!success){
    res.status(401).json({ message: 'Wrong password', ok : false })
  } else {
    res.status(200).json({ message: "Logged in successfully ", ok: true })
  }
}

const getDetails = async (req, res) => {
  const patient = await Patient.findById(req.params._id).populate('appointments').exec()

  res.status(200).json(patient)
}

module.exports = {
  addPatient,
  getDetails,
  login
}