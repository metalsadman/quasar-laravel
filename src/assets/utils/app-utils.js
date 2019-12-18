export const deepCopy = obj => JSON.parse(JSON.stringify(obj))

export const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    // reader.onloadend = (e) => resolve(imageToDataUri(e, 400, 400))
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

/**
* Fun fun functions
* @author Aldrin Marquez
*/

// return capitalize first letter of the string
export const capitalize = str =>
  str
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ')

// return replaced string
export const replaceAll = (str, find, replace) =>
  str.replace(new RegExp(find, 'g'), replace)
// load component path
export const load = component => () => import(`pages/${component}`)

// debounce
export const debounceAsyncValidator = (validator, delay) => {
  let currentTimer = null
  let currentPromiseReject = null

  function debounce () {
    return new Promise((resolve, reject) => {
      currentTimer = setTimeout(() => {
        currentTimer = null
        currentPromiseReject = null
        resolve()
      }, delay)
      currentPromiseReject = reject
    })
  }

  return function (value) {
    if (currentTimer) {
      currentPromiseReject(new Error('replaced or still editing'))
      clearTimeout(currentTimer)
      currentTimer = null
    }
    return validator.call(this, value, debounce)
  }
}

export const customFilter = (terms, {
  field,
  list
}) => {
  const token = terms.toLowerCase()
  return list.filter(item =>
    ('' + item[field]).toLowerCase().startsWith(token)
  )
}

export const removeItemFromArray = (terms, {
  field,
  list
}) => {
  const token = terms.toLowerCase()
  return list.filter(
    item => !('' + item[field]).toLowerCase().startsWith(token)
  )
}

// generate random
export const randomStr = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

export const tellerObfs = teller => {
  // return btoa(teller)
  let data = Buffer.from(teller)
  // return Buffer.from(teller, 'base64')
  return data.toString('base64')
}

// custom logger
export const log = (str, ...args) => {
  try {
    process.env.DEV &&
      console.log(
        `[APP_LOG]: ${replaceAll(
          [JSON.stringify(str)]
            .concat(args.map(v => JSON.stringify(v)))
            .join(''),
          '"',
          ''
        )}`
      )
  } catch (e) {
    console.log(`LOGGER ERROR:: ${e}`)
  }
}

// number currency format to peso
export const toPeso = str =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2
  }).format(parseFloat(str).toFixed(2))

// number currency format without currency sign
export const toCurrency = str => toPeso(str).replace('₱', '')

export const base64toBlob = (b64Data, contentType, sliceSize) => {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  var byteCharacters = atob(b64Data)
  var byteArrays = []

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize)

    var byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    var byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  var blob = new Blob(byteArrays, {
    type: contentType
  })
  return blob
}

export const checkIpAddress = str => {
  return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(?::[0-9]+)?$/g.test(
    str
  )
}
