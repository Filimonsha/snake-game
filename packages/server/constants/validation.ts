export const Pattern = {
  Login: /^[a-z]{1}[a-z\d_-]{2,19}$/i,
  Password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,40}$/,
  Name: /^[A-Z][A-Za-z]{0,20}[-\s]?[A-Za-z]{1,20}$/,
  Email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
  Phone: /^[+\d][\d]{10,15}$/,
}

export const Message = {
  Phone: 'Invalid phone',
  Password: 'Invalid password',
  Email: 'Email must be a valid email address',
  Name: 'Invalid name',
  Login: 'Invalid login'
}
