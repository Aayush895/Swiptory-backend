const express = require('express')
const validateToken = require('../middlewares/validateToken')
const {
  createStory,
  viewStories,
  editStory,
  storyById,
  likeStories,
  unlikeStories
} = require('../controllers/story')
const storyRouter = express.Router()

storyRouter.post('/createstory', validateToken, createStory)
storyRouter.get('/stories', viewStories)
storyRouter.get('/story-id/:id', storyById)
storyRouter.put('/updatestory/:id', validateToken, editStory)
storyRouter.put('/likeStory', validateToken, likeStories)
storyRouter.put('/unlikeStory', validateToken, unlikeStories)

module.exports = storyRouter
