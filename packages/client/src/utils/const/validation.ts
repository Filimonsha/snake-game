export const Pattern = {
  Login: /^[a-z]{1}[a-z\d_-]{2,19}$/i,
  Password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,40}$/,
}