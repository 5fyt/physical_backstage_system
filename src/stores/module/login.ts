import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, loginOut, updatePhoto } from '@/services/api/login'
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
 * 用户登入异步
 */
export const loginUser = createAsyncThunk('login', async (data: loginParams) => {
  const type = localStorage.getItem('type') as string
  const res = await login(data, type)
  localStorage.setItem('token', res.data.token)
  localStorage.setItem('name', res.data.name)
  localStorage.setItem('photo', res.data.photo)
  return res
})

/**
 * 退出登入
 */
export const logoOut = createAsyncThunk('logoutO', async () => {
  const type = localStorage.getItem('type') as string
  const { data } = await loginOut(type)
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
    const type = localStorage.getItem('type') as string
    const res = await updatePhoto(data, type)
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
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.token = payload.data.token
        state.photo = payload.data.photo
        state.name = payload.data.name
        state.code = payload.code
      })

      .addCase(logoOut.fulfilled, () => {})
      .addCase(updateAavatar.fulfilled, (state, { payload }) => {
        state.photo = payload.data
      })
  }
})
export const selectLogin = (state: RootState) => state.login.code
export const photo = (state: RootState) => state.login.photo
export const Name = (state: RootState) => state.login.name
export default loginReducer.reducer
