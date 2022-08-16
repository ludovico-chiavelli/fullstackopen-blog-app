const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const fBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
  return (
    {
      title: fBlog.title,
      author: fBlog.author,
      likes: fBlog.likes
    }
  )
}

const mostBlogs = (blogs) => {
  // https://mikeheavers.com/tutorials/getting_the_most_commonly_repeated_object_value_from_an_array_using_lodash/
  const favAuthor = _.chain(blogs).countBy('author').toPairs().max(_.last).head().value()
  console.log(favAuthor)
  
  // count how many articles the most popular author has
  let authors = []

  blogs.forEach((blog) => {
    authors.push(blog.author)
  })

  const numArticles = _.max(Object.values(_.countBy(authors)))

  return (
    {
      author: favAuthor,
      blogs: numArticles
    }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}