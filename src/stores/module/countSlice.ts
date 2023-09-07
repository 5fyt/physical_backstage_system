import { createSlice } from '@reduxjs/toolkit'
interface InitType {
  count: number
}
const initialState: InitType = {
  count: 2
}
export const countSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increate: (state) => {
      state.count += 1
      console.log(1)
    }
  }
})
export const { increate } = countSlice.actions
export default countSlice.reducer
