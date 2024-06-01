export const backendApi = 'https://api-bet.ru:3012/api/v1'
export const backendApiBase = 'https://api-bet.ru:3012/'
export const wsApiBase = 'wss://api-bet.ru:9002'
export const wsApiChat = 'wss://api-bet.ru:9004'

const jsonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
} as any

const formDataHeaders = {
  accept: '*/*',
  ContentType: 'multipart/form-data',
  'Access-Control-Allow-Origin': '*',
} as any

const defautCustomOptions = {
  includeAuthHeader: true,
  includeCredentials: true,
} as any

export async function post(
  path,
  body = {},
  headers = {} as any,
  options = {},
  customOptions = defautCustomOptions as any
) {
  const val = localStorage.getItem('token')
  if (val) {
    headers.authorization = val
  }

  const request = await fetchEnriched(
    'POST',
    path,
    JSON.stringify(body),
    getHeaders(jsonHeaders, headers),
    options,
    customOptions
  )
  try {
    if (!request.ok) {
      const errRes = await request.json()
      const err: any = Error(errRes.error)
      err.status = request.status
      throw err
    }

    const type = request.headers.get('Content-Type')

    //temporary solution, it is necessary to change the returned text
    if (request.url.includes('send-confirm-code')) {
      return request
    }

    switch (type) {
      case 'application/json; charset=utf-8':
        return request.json()
      //   case 'text/plain; charset=utf-8':
      //   default:
    }
    return request
  } catch (err) {
    console.log('api err', err)
    throw err
  }
}

export async function postFormData(
  path,
  body = {},
  headers = {} as any,
  options = {},
  customOptions = defautCustomOptions
) {
  const val = localStorage.getItem('token')
  if (val) {
    headers.authorization = val
  }
  const request = await fetchEnriched('POST', path, body, getHeaders(formDataHeaders, headers), options, customOptions)

  try {
    if (!request.ok) {
      const errRes = await request.json()
      const err: any = Error(errRes.error)
      err.status = request.status
      throw err
    }
    return request.json()
  } catch (err) {
    throw err
  }
}

export async function putFormData(path, body = {}, headers = {}, options = {}, customOptions = defautCustomOptions) {
  const request = await fetchEnriched('PUT', path, body, getHeaders(formDataHeaders, headers), options, customOptions)

  try {
    if (!request.ok) {
      const errRes = await request.json()
      const err: any = Error(errRes.error)
      err.status = request.status
      throw err
    } else {
      if (typeof request === 'string') {
        return request
      } else {
        return request.json()
      }
    }
  } catch (err) {
    throw err
  }
}

export async function download(path, body = {}, headers = {}, options = {}, customOptions = defautCustomOptions) {
  const request = await fetchEnriched('GET', path, null, getHeaders(formDataHeaders, headers), options, customOptions)

  try {
    if (!request.ok) {
      const errRes = await request.json()
      const err: any = Error(errRes.error)
      err.status = request.status
      throw err
    }
    request.blob().then((blob) => {
      let url = window.URL.createObjectURL(blob)
      let a = document.createElement('a')
      a.href = url
      a.download = path
      a.click()
    })

    return 'Ok'
  } catch (err) {
    throw err
  }
}

export async function get(path, body = {}, headers = {} as any, options = {}, customOptions = defautCustomOptions) {
  const val = localStorage.getItem('token')
  if (val) {
    headers.authorization = val
  }
  const request = await fetchEnriched('GET', path, null, getHeaders(jsonHeaders, headers), options, customOptions)

  try {
    if (!request.ok) {
      const errRes = await request.json()
      const err: any = Error(errRes.error)
      err.status = request.status
      throw err
    }
    return request.json()
  } catch (err) {
    throw err
  }
}

export async function patch(path, body = {}, headers = {}, options = {}, customOptions = defautCustomOptions) {
  const request = await fetchEnriched(
    'PATCH',
    path,
    JSON.stringify(body),
    getHeaders(jsonHeaders, headers),
    options,
    customOptions
  )

  try {
    if (!request.ok) {
      const errRes = await request.json()
      const err: any = Error(errRes.error)
      err.status = request.status
      throw err
    }
    return request.json()
  } catch (err) {
    throw err
  }
}

export async function put(path, body = {}, headers = {}, options = {}, customOptions = defautCustomOptions) {
  const request = await fetchEnriched(
    'PUT',
    path,
    JSON.stringify(body),
    getHeaders(jsonHeaders, headers),
    options,
    customOptions
  )

  try {
    if (!request.ok) {
      const errRes = await request.json()
      const err: any = Error(errRes.error)
      err.status = request.status
      throw err
    }
    return request.json()
  } catch (err) {
    throw err
  }
}

export async function remove(path, body = {}, headers = {}, options = {}, customOptions = defautCustomOptions) {
  const request = await fetchEnriched('DELETE', path, null, getHeaders(jsonHeaders, headers), options, customOptions)
  try {
    if (!request.ok) {
      const errRes = await request.json()
      const err: any = Error(errRes.error)
      err.status = request.status
      throw err
    }
    return true
  } catch (err) {
    throw err
  }
}

export async function removeWithResponse(
  path,
  body = {},
  headers = {},
  options = {},
  customOptions = defautCustomOptions as any
) {
  const request = await fetchEnriched('DELETE', path, null, getHeaders(jsonHeaders, headers), options, customOptions)
  try {
    if (!request.ok) {
      const errRes = await request.json()
      const err: any = Error(errRes.error)
      err.status = request.status
      throw err
    }
    return request.json()
  } catch (err) {
    throw err
  }
}

function fetchEnriched(method: any, path: any, body: any, headers: any, options: any, customOptions: any) {
  const endpointUrl = getApiUrl(path)
  addAuthHeader(headers)
  return fetch(endpointUrl, {
    method: method,
    credentials: 'include',
    headers,
    body: body,
    ...options,
    ...customOptions,
  })
}

export function getApiUrl(path) {
  const developmentLink = backendApi

  const baseLink = developmentLink

  return baseLink + path
}

function getHeaders(defaultHeaders: any, headers: any) {
  return {
    ...defaultHeaders,
    ...headers,
  }
}

function addAuthHeader(headers) {
  const data = localStorage.getItem('session')

  if (data !== null) {
    const { token } = JSON.parse(data)
    if (token) {
      headers['authorization'] = token
    }
  }
}

export async function mockResponse(response) {
  return response
}

export const createFormData = (data: any) => {
  const formdata = new FormData()
  const newData = Object.entries(data)

  newData.forEach((item: any) => formdata.append(item[0], item[1]))

  return formdata
}
