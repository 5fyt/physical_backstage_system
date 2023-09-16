import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '..'
import { searchParams } from '@/services/types/user'
import { searchUser } from '@/services/api/admin'
type resultType = {
  id:string
  name: string
  username: string
  photo: string
  createTime: string
}
interface stateType<T> {
  totalCount: number
  results: T[]
}
const initialState: stateType<resultType> = {
  totalCount: 0,
  results: []
}
export const searchUserAsync = createAsyncThunk(
  'searchUser',
  async (data: searchParams) => {
    const type=localStorage.getItem('type') as string
    const res = await searchUser(data,type)
    return res
  }
)
const adminReducer = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchUserAsync.fulfilled, (state, { payload }) => {
      state.totalCount = payload.data.total
      state.results = payload.data.results
    })
  }
})
export const totalCount = (state: RootState) => state.adminA.totalCount
export const results=(state:RootState)=>state.adminA.results
export default adminReducer.reducer
