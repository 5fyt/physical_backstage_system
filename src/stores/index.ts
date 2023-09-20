import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import loginReducer from './module/login'
import menuReducer from './module/menu'
import adminReducer from './module/admin'
import goodsReducer from './module/goods'
const store = configureStore({
  reducer: {
    login: loginReducer,
    menu: menuReducer,
    adminA: adminReducer,
    goods: goodsReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
