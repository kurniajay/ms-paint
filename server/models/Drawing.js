import mongoose from 'mongoose';

const drawingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled'
  },
  imageData: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 800
  },
  height: {
    type: Number,
    default: 500
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});

export default mongoose.model('Drawing', drawingSchema);
