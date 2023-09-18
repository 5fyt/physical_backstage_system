import { createSlice } from '@reduxjs/toolkit'
interface InitType {
  show: boolean
}
const initialState: InitType = {
  show: false
}
export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    setShow: (state,{payload}) => {
      state.show=payload
     
    }
  }
})
export const { setShow } = goodsSlice.actions
export default goodsSlice.reducer
