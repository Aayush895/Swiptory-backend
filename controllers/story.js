const Story = require('../models/story.models')

const createStory = async (req, res) => {
  try {
    const { heading, desc, image, category, slides, user } = req.body

    if (!heading || !desc || !image || !category) {
      res.send({
        message: 'Please fill the story details',
      })
    }

    await Story.create({
      heading,
      description: desc,
      imageUrl: image,
      createdBy: user.userID,
      category,
      slides,
    })

    res.send({
      message: 'Story was created successfully',
    })
  } catch (error) {
    console.log(error)
  }
}

const editStory = async (req, res) => {
  try {
    const { heading, desc, image, category } = req.body
    const { id } = req.params
    if (!heading || !desc || !image || !category) {
      res.send({
        message: 'Please fill all the details to update the story',
      })
    }
    await Story.findByIdAndUpdate(
      { _id: id },
      { heading, description: desc, imageUrl: image, category }
    )

    res.send({
      message: `Story was updated successfully`,
    })
  } catch (error) {
    console.log(error)
  }
}

const storyById = async (req, res) => {
  try {
    const { id } = req.params
    const storybyId = await Story.findById({ _id: id })
    res.send({
      message: `story by id:${id} was fetched successfully`,
      story: storybyId,
    })
  } catch (error) {
    console.log(error)
  }
}

const viewStories = async (req, res) => {
  try {
    let filterCategory = req.query.category
    filterCategory = filterCategory.toLowerCase()

    const stories = await Story.find().populate('createdBy')
    let filteredStories = {
      food: [],
      'health and fitness': [],
      travel: [],
      movies: [],
      education: [],
    }
    if (filterCategory == 'all') {
      for (let i = 0; i < stories.length; i++) {
        if (stories[i]?.category == 'food') {
          filteredStories?.food.push(stories[i])
        } else if (stories[i]?.category == 'health and fitness') {
          filteredStories?.['health and fitness'].push(stories[i])
        } else if (stories[i]?.category == 'travel') {
          filteredStories?.travel.push(stories[i])
        } else if (stories[i]?.category == 'movies') {
          filteredStories?.movies.push(stories[i])
        } else {
          filteredStories?.education.push(stories[i])
        }
      }
    } else {
      filteredStories = {
        [filterCategory]: stories.filter(
          (story) => story.category.toLowerCase() == filterCategory
        ),
      }
    }

    res.send({
      message: 'Fetched all the stories',
      filteredStories,
    })
  } catch (error) {
    console.log(error)
  }
}

const likeStories = async (req, res) => {
  try {
    const { id } = req.body
    const userId = req.body.user.userID

    const isLiked = await Story.findOne({ likedStories: userId })

    if (isLiked) {
      res.send({
        message: 'liked',
      })
    } else {
      await Story.findByIdAndUpdate(
        { _id: id },
        {
          $push: { likedStories: userId },
        },
        {
          new: true,
        }
      )
      res.send({
        message: 'The story was liked successfully',
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const unlikeStories = async (req, res) => {
  try {
    const { id } = req.body
    const userId = req.body.user.userID
    await Story.findByIdAndUpdate(
      { _id: id },
      {
        $pull: { likedStories: userId },
      },
      {
        new: true,
      }
    )

    res.send({
      message: 'The story was unliked successfully',
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createStory,
  viewStories,
  editStory,
  storyById,
  likeStories,
  unlikeStories,
}
