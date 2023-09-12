import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import countReducer from './module/countSlice'
import loginReducer from './module/login'
import menuReducer from './module/menu'
const store = configureStore({
  reducer: {
    counter: countReducer,
    login:loginReducer,
    menu:menuReducer
  }
})
export  type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
