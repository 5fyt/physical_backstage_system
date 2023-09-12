import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
type stateType = {
  collapsed: boolean
}
const initialState: stateType = {
  collapsed: false
}
const menuReducer = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    updateCollapsed: (state, action) => {
      const data = action.payload
      state.collapsed = data
    }
  }
})
export const collapse = (state: RootState) => state.menu.collapsed
export const { updateCollapsed } = menuReducer.actions
export default menuReducer.reducer
