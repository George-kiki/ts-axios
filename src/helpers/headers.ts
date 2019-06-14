import {isPlainObject} from "./utils"


function normalizeHeader(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeader(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): Object { // 解析headers字符串 headers传过一定是string类型的
  let parsed = Object.create(null) // 创建一个空对象
  if (!headers) { // 判断是否有headers 没有直接返回
    return parsed
  }
  headers.split('\r\n').forEach(line => { // 拆分换行符
    let [key,val] = line.split(':') // 拆分分号 解构赋值key,val
    if (!key) { // 判断 有没有key没有直接返回
      return
    }
    key = key.trim().toLowerCase() // 去掉空格转小写
    if (val) { // 判断有没有val
      val = val.trim() // 去掉空格
    }
    parsed[key] = val // 添加到空对象中
  })
  return  parsed // 返回对象
}
