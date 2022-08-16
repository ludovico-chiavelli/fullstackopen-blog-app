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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}