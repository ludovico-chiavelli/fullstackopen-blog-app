const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogsRouter.post('/blogs', async (request, response) => {
  let blog = undefined
  if (request.body.likes === undefined) {
    payLoad = request.body
    payLoad.likes = 0
    blog = new Blog(payLoad)
  } else {
    blog = new Blog(request.body)
  }
  result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter