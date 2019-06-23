const mongoose = require('mongoose')
const { Schema } = mongoose

const HospitalSchema = new Schema({
  name: String,
  location: String,
  doctors: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    autopopulate: true
  }],
})

const DoctorSchema = new Schema({
  name: String,
  specialization: String,
  hospital: { 
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    autopopulate: true
  },
  appointments: [{
    type: Schema.Types.ObjectId,
    ref:'Appointment',
    autopopulate: true
  }]
})

const AppointmentSchema =new Schema({
  day: String,
  from: String,
  length: Number,
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    autopopulate: true
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    autopopulate: true
  }
})

const PatientSchema = new Schema({
  name: String,
  contact: String,
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
})

AppointmentSchema.plugin(require('mongoose-autopopulate'))
DoctorSchema.plugin(require('mongoose-autopopulate'))
HospitalSchema.plugin(require('mongoose-autopopulate'))
PatientSchema.plugin(require('mongoose-autopopulate'))

const Hospital = mongoose.model('Hospital', HospitalSchema)
const Doctor = mongoose.model('Doctor', DoctorSchema)
const Appointment = mongoose.model('Appointment', AppointmentSchema)
const Patient = mongoose.model('Patient', PatientSchema)

module.exports ={
  Doctor,
  Hospital,
  Appointment,
  Patient
}