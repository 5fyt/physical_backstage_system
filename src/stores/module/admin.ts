import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '..'
import { doctorParams } from '@/services/types/doctor'
import { searchAdmin } from '@/services/api/admin'
type resultType = {
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
export const searchDoctorAsync = createAsyncThunk(
  'searchUser',
  async (data: doctorParams) => {
    const res = await searchAdmin(data)
    return res
  }
)
const adminReducer = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchDoctorAsync.fulfilled, (state, { payload }) => {
      state.totalCount = payload.data.total
      state.results = payload.data.results
    })
  }
})
export const totalCount = (state: RootState) => state.adminA.totalCount
export const results=(state:RootState)=>state.adminA.results
export default adminReducer.reducer
