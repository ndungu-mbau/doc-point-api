const Hospital = require('./Hospital')
const Appointment = require('./Appointment')
const Patient = require('./Patient')
const Doctor = require('./Doctor')

const { auth } = require('../utils')

module.exports = {
  get:{
    '/hospital': Hospital.getAllHospitals,
    '/hospital/:_id': Hospital.getHospital,
    '/appointment/:_id': Appointment.getAppointment,
    '/doctor/:_id': Doctor.getDoctor,
    '/patient': [auth, Patient.getDetails]
  },
  post:{
    '/hospital': Hospital.createHospital,
    '/appointment': Appointment.createAppointment,
    '/doctor': Doctor.addDoctor,
    '/patient': Patient.addPatient,
    '/patient/login': Patient.login
  }
}