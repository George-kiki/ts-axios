import dispatchRequest from '../../src/index'

dispatchRequest({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
