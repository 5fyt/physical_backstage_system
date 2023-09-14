import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginDr, loginOp, loginOutOp, updatePhoto } from '@/services/api/login'
import { loginParams, photoParams } from '@/services/types/login'
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
/**
 * 退出登入
 */
export const logoutOp = createAsyncThunk('logoutO', async () => {
  const { data } = await loginOutOp()
  localStorage.removeItem('token')
  localStorage.removeItem('openKeys')
  localStorage.removeItem('photo')
  localStorage.removeItem('name')
  return data
})
/**
 * 修改头像
 */
export const updateAavatar = createAsyncThunk(
  'avartar',
  async (data: photoParams) => {
    const res = await updatePhoto(data)
    localStorage.setItem('photo', res.data)
    return res
  }
)
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
      .addCase(logoutOp.fulfilled, () => {})
      .addCase(updateAavatar.fulfilled, (state, { payload }) => {
        state.photo = payload.data
      })
  }
})
export const selectLogin = (state: RootState) => state.login.code
export const photo = (state: RootState) => state.login.photo
export const Name = (state: RootState) => state.login.name
export default loginReducer.reducer
