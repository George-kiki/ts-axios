const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const webpack = require('webpack')
const cookieParser = require('cookie-parser')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')
const multipart = require('connect-multiparty')
const atob = require('atob')
require('./server2')
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

app.use(express.static(__dirname,{
  setHeaders(res){
    res.cookie('XSRF-TOKEN-D','1234abc')
  }
}))
app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

const router = express.Router()

router.get('/simple/get', (req, res) => {
  res.json({
    msg: 'hello world'
  })
})
router.get('/base/get', (req, res) => {
  res.json(req.query)
})
router.post('/base/post', (req, res) => {
  res.json(req.body)
})
router.post('/base/buffer', function (req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})
router.get('/error/get', function (req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function (req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})

router.get('/extend/user', (req, res) => {
  res.json({
    code: 0,
    data: {
      age: 18,
      name: 'zhangsan'
    },
    message: 'success'
  })
})
router.get('/interceptor/get', (req, res) => {
  res.json({
    code: 0,
    data: 123
  })
})

router.post('/config/post', (req, res) => {
  res.json(req.body)
})

router.get('/cancel/get',(req,res)=>{
  setTimeout(()=>{
    res.json(req.query)
  },1000)
})
router.post('/cancel/post',(req,res)=>{
  setTimeout(()=>{
    res.json(req.body)
  },1000)
})

router.get('/more/get',(req,res)=>{
  res.json(req.cookies)
})
router.post('/more/upload', function(req, res) {
  console.log(req.body, req.files)
  res.end('upload success!')
})
router.post('/more/post', function(req, res) {
  const auth = req.headers.authorization

  const [type,credentials] = auth.split(' ')
  const [username,password] = atob(credentials.split(':'))
  console.log(username,password)
  if  (type === 'Basic' && username === 'George' && password === 'gg520') {

    res.json(req.body)
  }else{
    res.status(401)
    res.end('UnAuthorization')
  }
})

router.get('/more/304',(req,res)=>{
  res.status(304)
  res.json(req.body)
})
router.get('/more/get',(req,res)=>{
  res.json(req.query)
})

router.get('/more/A',(req,res)=>{
  res.json(req.query)
})

router.get('/more/B',(req,res)=>{
  res.json(req.query)
})
app.use(router)
const post = process.env.PORT || 8081

module.exports = app.listen(post, () => {
  console.log(`Server listening on http:localhost:${post}, Ctrl+c to stop`)
})
