/*
Данные функции кешируют все изображения
Так при вторичной отрисовке они заново не подгружаются и быстрее отображаются.
*/

type TObjectOptimize = {
  [p: string]: string
}

const objectOptimize = async (obj: TObjectOptimize) => {
  return await Object.entries(obj).reduce(
    async (acc, [k, v]) => {
      const img = new Image()
      img.src = v
      return {
        ...await acc,
        [k]: img
      }
    },
    Promise.resolve({})
  )
}

const listOptimize = async (list: string[]) => {
  return await Promise.all(list.map(async (item: string) => {
    const img = await new Image()
    img.src = item
    return img
  }))
}

export {
  objectOptimize,
  listOptimize
}
