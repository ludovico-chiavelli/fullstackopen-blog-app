require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = 'mongodb+srv://keywell:M7JmB3hiI0EtCyil@cluster0.wg8uc.mongodb.net/blog-app?retryWrites=true&w=majority'

module.exports = {
  MONGODB_URI,
  PORT
}