import mongoose from 'mongoose'

// Define the schema structure and validation rules
const noteschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Ensures the title field must be present
      trim: true, // Trims whitespace from both ends of the string
    },
    content: {
      type: String,
      required: true, // Ensures the content field must be present
    },
    // No need to define 'createdAt' or 'updatedAt' here
  },
  {
    timestamps: true,
  }
)

// Create the model from the schema
const Note = mongoose.model('note', noteschema)

export default Note
