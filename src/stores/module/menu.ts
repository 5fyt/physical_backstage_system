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
      const pathname = data.path
      const patharr = pathname.split('/')
      state.collapsed = data.collapsedApp
      if (patharr.length > 2) {
        localStorage.setItem('openKeys', JSON.stringify([patharr[1]]))
      } else {
        localStorage.setItem('openKeys', JSON.stringify(['physical']))
      }
    }
  }
})
export const collapse = (state: RootState) => state.menu.collapsed
export const { updateCollapsed } = menuReducer.actions
export default menuReducer.reducer
