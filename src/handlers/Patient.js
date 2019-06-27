const { Patient } = require('../models')
const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

const { SECRET } = process.env

const addPatient = async (req, res) => {
  const { name, email, password } = req.body
  console.log({ name, email, password })

  const people = await Patient.find({ email: email }).exec()

  if(people.length !== 0){
    res.status(200).json({ ok: false, message: "Email is already in use" })
  } else {
    const newPassword = sha1(password)
    const newPatient = new Patient({ name, email, password:newPassword })

    await newPatient.save()

    const token = jwt.sign({patient: newPatient.id, email: newPatient.email}, SECRET)
    res.cookie('auth', token)

    res.status(200).json({ ok:true })
  }
}

const login = async (req, res) => {
  const { contact, password } = req.body

  const patient = await Patient.findOne({ contact: contact }).exec()

  if(!patient){
    res.status(200).json({ message: 'No user found', ok: false})
  }

  const newPassword = sha1(password)
  const success = newPassword === patient.password

  if(!success){
    res.status(200).json({ message: 'Wrong email/password combination', ok : false })
  } else {
    const token = jwt.sign({patient: patient.id, email: patient.email}, SECRET)
    res.cookie('auth', token)
    res.status(200).json({ message: "Logged in successfully ", ok: true, token })
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