import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginDr, loginOp, loginOutOp } from '@/services/api/login'
import { loginParams } from '@/services/types/login'
import { RootState } from '..'

type stateType = {
  code: number
  token: string
  photo: string
  name: string
}
const initialState: stateType = {
  code: 0,
  token: localStorage.getItem('token') || '',
  photo: localStorage.getItem('photo') || '',
  name: localStorage.getItem('name') || ''
}

/**
 * 医生端用户登入异步
 */
export const operationLogin = createAsyncThunk(
  'loginO',
  async (data: loginParams) => {
    const res = await loginDr(data)
    localStorage.setItem('token', res.data.token)
    return res
  }
)
/**
 * 运行端用户登入
 */
export const doctorLogin = createAsyncThunk(
  'loginD',
  async (data: loginParams) => {
    const res = await loginOp(data)
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('name', res.data.name)
    localStorage.setItem('photo', res.data.photo)
    return res
  }
)
export const logoutOp = createAsyncThunk('logoutO', async () => {
  await loginOutOp()
  localStorage.removeItem('token')
  localStorage.removeItem('openKeys')
  localStorage.removeItem('photo')
  localStorage.removeItem('name')
})
const loginReducer = createSlice({
  name: 'loginStore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(operationLogin.fulfilled, (state, { payload }) => {
        state.token = payload.data.token
        state.photo = payload.data.photo
        state.name = payload.data.name
        state.code = payload.code
      })
      .addCase(doctorLogin.fulfilled, (state, { payload }) => {
        state.code = payload.code
        state.photo = payload.data.photo
        state.name = payload.data.name
        state.token = payload.data.token
      })
  }
})
export const selectLogin = (state: RootState) => state.login.code
export const photo = (state: RootState) => state.login.photo
export const Name = (state: RootState) => state.login.name
export default loginReducer.reducer
