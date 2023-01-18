/*
Данные функции загружают все необходимые для игры изображения и переводят их в
base64.
Так при вторичной отрисовке они заново не подгружаются и быстрее отображаются.
*/

import { getBase64FromUrl } from './utils'

const getFoodOptimize = async () => {
  const listFoods: { [p: string]: string } = {
    apple: `snakeGame/food/apple.svg`,
    banana: `snakeGame/food/banana.svg`,
    cherry: `snakeGame/food/cherry.svg`,
    grape: `snakeGame/food/grape.svg`,
    pear: `snakeGame/food/pear.svg`,
    strawberry: `snakeGame/food/strawberry.svg`
  }

  const listFoodsToBase64 = await Object.entries(listFoods).reduce(
    async (acc, [k, v]) => {
      return {
        ...await acc,
        [k]: await getBase64FromUrl(v)
      }
    },
    Promise.resolve({})
  )

  return listFoodsToBase64
}

const getGridsBgOptimize = async () => {
  const listBg = [
    `snakeGame/grid/BG-1.png`,
    `snakeGame/grid/BG-2.png`,
    `snakeGame/grid/BG-3.png`,
    `snakeGame/grid/BG-4.png`,
    `snakeGame/grid/BG-5.png`,
    `snakeGame/grid/BG-6.png`
  ]

  const listBgToBase64 = await Promise.all(listBg.map(async (item: string) => {
    return await getBase64FromUrl(item) as string
  }))

  return listBgToBase64
}

export {
  getFoodOptimize,
  getGridsBgOptimize
}
