import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '..'
import { addGoods, searchGoods } from '@/services/api/goods'
import { Type, searchParams, addParams } from '@/services/types/goods'

type DataType = {
  key: React.Key
  name: string
  code: string
  currentPrice: string
  originalPrice: string
  discount: string
  salesVolume: number
  type: string
  status: number
  hasExcel: boolean
}
interface stateType<T> {
  page: number
  size: number
 
  totalCount: number
  results: T[]
}
const initialState: stateType<DataType> = {
  page: 1,
  size: 10,

  totalCount: 0,
  results: []
}
export const searchGoodsAsync = createAsyncThunk(
  'searchGoods',
  async (data: searchParams) => {
    const res = await searchGoods(data)
    return res
  }
)
export const createGoodsAsync = createAsyncThunk(
  'createGoods',
  async (data: addParams<Type>) => {
    const res = await addGoods(data)
    return res
  }
)
export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    updatePage: (state, { payload }) => {
      state.page = payload.current
      state.size = payload.pageSize
    },

  },
  extraReducers: (builder) => {
    builder.addCase(searchGoodsAsync.fulfilled, (state, { payload }) => {
      state.totalCount = payload.data?.total
      const results = payload.data?.results
      state.results = results?.map((item: any) => {
        return { ...item, key: item.id }
      })
    })
  }
})
export const { updatePage } = goodsSlice.actions
export const totalCount = (state: RootState) => state.goods.totalCount
export const results = (state: RootState) => state.goods.results
export const pageIndex = (state: RootState) => state.goods.page
export const pageSize = (state: RootState) => state.goods.size

export default goodsSlice.reducer
