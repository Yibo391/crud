'use strict'

import mongoose from 'mongoose'

const { Schema } = mongoose

const snippetSchema = new Schema(
  {
    tag: {
      type: String,
      required: [true, 'Tag is required'],
      uppercase: true
    },
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    author: {
      type: String,
      required: [true, 'Author is required']
    },
    snippet: {
      type: String,
      required: [true, 'Snippet content is required']
    },
    ownerID: {
      type: String,
      required: [true, 'Owner ID is required']
    }
  },
  { timestamps: true }
)

const Snippet = mongoose.model('Snippet', snippetSchema)

export default Snippet
