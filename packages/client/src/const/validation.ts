export const Pattern = {
  Login: /^[a-z]{1}[a-z\d_-]{2,19}$/i,
  Password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,40}$/,
  Name: /^[A-Z][A-Za-z]{0,20}[-\s]?[A-Za-z]{1,20}$/,
  Email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
  Phone: /^[+\d][\d]{10,15}$/,
}

export const Feedback = {
  Password: '8 to 40 characters, at least one capital letter and number',
  PasswordRepeat: 'Password doesn\'t match',
  Username: '3 to 20 characters: letters, numbers, hyphens or underscores',
  Name: 'Capital first letter. Only letters, hyphen or space',
  Email: 'Wrong email format',
  Phone: '10 to 15 digits, may start with +',
}
