
import dispatchRequest from '../../src/index'


/*
dispatchRequest({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

dispatchRequest({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

dispatchRequest({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

dispatchRequest({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

dispatchRequest({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

dispatchRequest({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

dispatchRequest({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})
*/

/*dispatchRequest({
  method: 'post',
  url: '/base/post',
  data:{
    a: 1,
    b: 1
  }
})

const arr = new Int32Array([21, 31])

dispatchRequest({
  method: 'post',
  url: '/base/buffer',
  data: arr
})*/
/*

dispatchRequest({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2,
    c: 3
  }
})

dispatchRequest({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;'
  },
  data: {
    a: 1,
    b: 2
  }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

dispatchRequest({
  method: 'post',
  url: '/base/post',
  data: searchParams
})
*/
dispatchRequest({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})

dispatchRequest({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then((res) => {
  console.log(res)
})
