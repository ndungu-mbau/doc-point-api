const { Appointment, Patient, Doctor } = require('../models')

const createAppointment = async (req, res) => {
  const { doctor: doctorId, patient: patientId } = req.body
  const doctor = await Doctor.findById(doctorId).exec()
  const patient = await Patient.findById(patientId).exec()

  const newAppointment = new Appointment(req.body)

  doctor.appointments.push(newAppointment._id)
  patient.appointments.push(newAppointment._id)

  await newAppointment.save()
  await doctor.save()
  await patient.save()

  res.status(200).json(newAppointment)
}

const getAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params._id).populate().exec()

  res.status(200).json(appointment)
}

module.exports = {
  createAppointment,
  getAppointment
}