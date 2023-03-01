import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserFullInfo } from '../../types/auth'


const initialState: { user: UserFullInfo } = {
  user: {
    avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: ''
  },
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<UserFullInfo>) => {
      state.user = action.payload
    },
  },
})

export const { logout, setUser } = userSlice.actions
export default userSlice.reducer
