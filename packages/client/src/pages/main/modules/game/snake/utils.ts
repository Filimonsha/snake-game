const getBase64FromUrl = async (url: string) => {
  const data = await fetch(url)
  const blob = await data.blob()
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      const base64data = reader.result
      resolve(base64data)
    }
  })
}

const getRandomObjectItem = (obj: { [key: string]: any }) => {
  return obj[Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)]]
}

export {
  getBase64FromUrl,
  getRandomObjectItem
}
