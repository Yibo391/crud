'use strict'

import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User
