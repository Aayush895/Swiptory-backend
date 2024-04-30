const mongoose = require('mongoose')
const { Schema } = mongoose

const storySchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: String,
      enum: ['food', 'health and fitness', 'travel', 'movies', 'education'],
      required: true,
    },
    slides: [
      {
        heading: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        imageUrl: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          enum: ['food', 'health and fitness', 'travel', 'movies', 'education'],
          required: true,
        },
      },
    ],
    likedStories: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

const Story = mongoose.model('Story', storySchema)

module.exports = Story
