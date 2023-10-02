export type Type = {
  name: string
  description: string
}
export type updateParams<T> = {
  id: string
  name?: string
  code?: string
  description?: string
  originalPrice?: string
  currentPrice?: string
  discountId: string
  image?: string
  type?: number
  tag: string[]
  sort?: number
  departmentCheckup?: T[]
  laboratoryCheckup?: T[]
  medicalCheckup?: T[]
  otherCheckup?: T[]
}
export type searchParams = {
  page: number
  size: number
  name?: string
  code?: string
  type?: number
  status?: number
}
export type addParams<T> = {
  name: string
  code: string
  description: string
  originalPrice: string
  currentPrice: string
  discountId?: string
  image: string
  type: number
  tag?: string[]
  sort: number
  departmentCheckup?: T[]
  laboratoryCheckup?: T[]
  medicalCheckup?: T[]
  otherCheckup?: T[]
}
export type deleteParams = {
  ids: string[]
}
export type statusParams = {
  id: string
  status: number
}
export type UploadType = {
  suffix: string
  id?: string
}
export type UpdateType = {
  id: string
  path: string
}
