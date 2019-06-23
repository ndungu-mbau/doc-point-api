const { Appointment, Patient } = require('../models')

const createAppointment = async (req, res) => {
  const newAppointment = new Appointment(req.body)

  await newAppointment.save()

  res.status(200).json(newAppointment)
}

const getAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params._id).exec()

  res.status(200).json(appointment)
}

module.exports = {
  createAppointment,
  getAppointment
}