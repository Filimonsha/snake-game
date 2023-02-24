/*
Данные функции кешируют все изображения
Так при вторичной отрисовке они заново не подгружаются и быстрее отображаются.
*/

type TObjectOptimize = {
  [p: string]: string
}

const objectOptimize = (obj: TObjectOptimize) => {
  return Object.entries(obj).reduce(
    (acc, [k, v]) => {
      const img = new Image()
      img.src = v
      return {
        ...acc,
        [k]: img
      }
    },
    {}
  )
}

const listOptimize = (list: string[]) => {
  return list.map((item: string) => {
    const img = new Image()
    img.src = item
    return img
  })
}

export {
  objectOptimize,
  listOptimize
}
