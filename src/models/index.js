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
  }],
  timeslots: {
    type: Schema.Types.ObjectId,
    ref: 'Timeslot'
  }
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

const TimeSlotsSchema = new Schema({
  timeStart: String,
  lenght : Number
})

const PatientSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
})

const Hospital = mongoose.model('Hospital', HospitalSchema)
const Doctor = mongoose.model('Doctor', DoctorSchema)
const Appointment = mongoose.model('Appointment', AppointmentSchema)
const Patient = mongoose.model('Patient', PatientSchema)
const Timeslots = mongoose.model('Timeslot', TimeSlotsSchema)

module.exports ={
  Hospital,
  Doctor,
  Appointment,
  Patient,
  Timeslots
}