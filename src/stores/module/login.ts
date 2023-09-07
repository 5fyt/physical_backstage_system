import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from '@/services/api/login'
import { loginParams } from '@/services/types/login'

type stateType = {
  token: string
  permissions: string[]
}
const initialState: stateType = {
  token: '',
  permissions: []
}
export const loginAsync = createAsyncThunk(
  'login',
  async (data: loginParams) => {
    const res = await login(data)
    localStorage.setItem('token',res.data.token)
    localStorage.setItem('permissions',JSON.stringify(res.data.permission))
    return res.data
  }
)
const loginStore = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state = { ...action.payload }
    })
  }
})
export default loginStore.reducer
