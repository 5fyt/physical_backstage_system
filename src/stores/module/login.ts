import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from '@/services/api/login'
import { loginParams } from '@/services/types/login'
import { RootState } from '..'

type stateType = {
  code: number
  token: string
  permissions: string[]
}
const initialState: stateType = {
  code: 0,
  token: localStorage.getItem('token') || '',
  permissions: []
}
export const loginAsync = createAsyncThunk(
  'login',
  async (data: loginParams) => {
    const res = await login(data)
    localStorage.setItem('token', res.token)
    localStorage.setItem('permissions', JSON.stringify(res.permissions))
    return res
  }
)
const loginReducer = createSlice({
  name: 'loginStore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, { payload }) => {
      state.token = payload.token
      state.permissions = payload.permissions
      state.code = payload.code
    })
  }
})
export const selectLogin = (state:RootState) => state.login.code
export default loginReducer.reducer
