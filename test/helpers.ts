export function getAjaxRequest(): Promise<JasmineAjaxRequest> {
  return new Promise<JasmineAjaxRequest>(function(resolve) {
    setTimeout(() => {
      return resolve(jasmine.Ajax.requests.mostRecent())
    }, 0)
  })
}
