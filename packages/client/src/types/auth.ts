export type UserShortInfo = {
  login: string,
  password: string
}

export type UserFullInfo = {
  id:number,
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
  avatar?:string
}
