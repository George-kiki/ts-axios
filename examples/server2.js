const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const cookieParser = require('cookie-parser')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
const router = express.Router()

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}


router.post('/more/server2',(req,res)=>{
  res.set(cors)
  res.json(req.cookies)
})

router.options('/more/server2',(req,res)=>{
  res.set(cors)
  res.end()
})
app.use(router)
const post = process.env.PORT || 8088

module.exports = app.listen(post, () => {
  console.log(`Server listening on http:localhost:${post}, Ctrl+c to stop`)
})
