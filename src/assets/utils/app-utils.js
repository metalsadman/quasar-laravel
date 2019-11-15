export const deepCopy = obj => JSON.parse(JSON.stringify(obj))

export const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    // reader.onloadend = (e) => resolve(imageToDataUri(e, 400, 400))
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
