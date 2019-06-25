const { Patient } = require('../models')
const sha1 = require('sha1')

const addPatient = async (req, res) => {
  const { name, email, password } = req.body
  console.log({ name, email, password })

  const people = await Patient.find({ email: email }).exec()

  if(people.length !== 0){
    res.status(404).json({ message: "Email is already in use" })
  }

  const newPassword = sha1(password)
  const newPatient = new Patient({ name, email, password:newPassword })

  await newPatient.save()
  res.status(200).json({ ok:true })
}

const login = async (req, res) => {
  const { contact, password } = req.body

  const patient = await Patient.findOne({ contact: contact }).exec()

  if(!patient){
    res.status(401).json({ message: 'No user found', ok: false})
  }

  const success = await bcrypt.compare(password, patient.password)

  if(!success){

  }

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