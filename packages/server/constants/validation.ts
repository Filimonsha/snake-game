export const Pattern = {
  Login: /^[a-z]{1}[a-z\d_-]{2,19}$/i,
  Password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,40}$/,
  Name: /[\p{Lu}][\p{Letter}\p{Mark}\s]{1,20}/gu,
  Email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
  Phone: /^[+\d][\d]{10,15}$/,
}

export const Message = {
  Phone: 'Invalid phone format',
  Password: 'Invalid password format',
  Email: 'Email must be a valid email address',
  Name: 'Invalid name format',
  Login: 'Invalid login format'
}
