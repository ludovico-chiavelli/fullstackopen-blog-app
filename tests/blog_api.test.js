const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  console.log('blogObjects created')
  const promiseArray = blogObjects.map(blog => blog.save())
  console.log('blogObjects saved')
  await Promise.all(promiseArray)
})

describe('blog posts', () => {
  test('have correct amount of posts in JSON format', async () => {
    const response = await api.get('/api/blogs')
    expect(200)
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test('are in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('have id property', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    expect(200)
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })
  test('are created correctly', async () => {
    const createdRes = await api
      .post('/api/blogs')
      .send({
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    
    expect(201)
    expect(createdRes.body).toEqual({
      id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    })

    const amountRes = await api.get('/api/blogs')
    expect(amountRes.body.length).toEqual(initialBlogs.length + 1)
  })
  test('undefined likes defaults to 0', async () => {
    const createdRes = await api.post('/api/blogs')
      .send({
        _id: "5a422bc61b54a676223d17fc",
        title: "Fictional",
        author: "Salam aleikum",
        url: "http://test.com",
        __v: 0
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    
    expect(201)
    expect(createdRes.body).toEqual({
      id: "5a422bc61b54a676223d17fc",
      title: "Fictional",
      author: "Salam aleikum",
      likes: 0,
      url: "http://test.com",
    })
  })
  test('POSTed without url or title return HTTP code 400', async () => {
    const erroRes = await api.post('/api/blogs')
      .send({
        _id: "5a422bc61b54a676223d17fc",
        author: "Salam aleikum",
        url: "http://test.com",
        __v: 0
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(400)
  })
  test('DELETE blog post works', async () => {
    const result = await api.delete('/api/blogs/5a422a851b54a676234d17f7')
    expect(204)
  })
  test('PUT request to update blog likes', async () => {
    const result = await api.put('/api/blogs/5a422a851b54a676234d17f7')
      .send({
        likes: 200
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(200)
    expect(result.body).toEqual({
      id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 200,
    })

  })
})

afterAll(() => {
  mongoose.connection.close()
})