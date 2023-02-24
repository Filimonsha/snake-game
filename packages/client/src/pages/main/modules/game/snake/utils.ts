const getRandomObjectItem = (obj: { [key: string]: any }) => {
  return obj[Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)]]
}

export {
  getRandomObjectItem
}
