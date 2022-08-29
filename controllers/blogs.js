const blogsRouter = require('express').Router()
const { response } = require('express')
const { request } = require('../app')
const Blog = require('../models/blog')


blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogsRouter.post('/blogs', async (request, response) => {
  let blog = undefined
  if (request.body.url === undefined || request.body.url === "" || request.body.title === undefined || request.body.title === "") {
    response.status(400).json({error: 'url or title missing'})
  } else if (request.body.likes === undefined) {
    payLoad = request.body
    payLoad.likes = 0
    blog = new Blog(payLoad)
    result = await blog.save()
    response.status(201).json(result)
  } else {
    blog = new Blog(request.body)
    result = await blog.save()
    response.status(201).json(result)
  }
})

blogsRouter.delete('/blogs/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).json(result)
})

blogsRouter.put('/blogs/:id', (request, response) => {
  Blog.findById(request.params.id)
    .then(oldBlog => {
      const newBlog = {
        id: oldBlog.id,
        title: oldBlog.title,
        author: oldBlog.author,
        url: oldBlog.url,
        likes: request.body.likes,
      }
      Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
        .then((updatedBlog) => {
          response.status(200).json(updatedBlog)
        })
    })
  })

module.exports = blogsRouter