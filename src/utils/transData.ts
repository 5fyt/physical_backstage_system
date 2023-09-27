export const transResults = (data: any) => {
  //[0_description,0_name,0_type,1_description,1_name,2_type,...]
  //[{[]}]
  let resultObj = {}
  const arr = Object.keys(data).filter((item) => item.includes('_'))
  const type1 = arr.filter((item) => data[item] === 1) //['4_type','0_type']
  const type2 = arr.filter((item) => data[item] === 2)
  const type3 = arr.filter((item) => data[item] === 3)
  const type4 = arr.filter((item) => data[item] === 4)
  const result1 = transFn(data, type1)
  const result2 = transFn(data, type2)
  const result3 = transFn(data, type3)
  const result4 = transFn(data, type4)
  resultObj = {
    ...(result1.length > 0 && { departmentCheckup: result1 }),
    ...(result2.length > 0 && { laboratoryCheckup: result2 }),
    ...(result3.length > 0 && { medicalCheckup: result3 }),
    ...(result4.length > 0 && { medicalCheckup: result4 })
  }

  return resultObj
}
const transFn = (data: any, type: string[]) => {
  const arr = Object.keys(data).filter((item) => item.includes('_'))
  type = type.map((item) => item.split('_')[0])
  const arr1 = arr.filter((item) => type.includes(item.split('_')[0]))
  //arr1 ['0_description', '0_name', '0_type', '4_description', '4_name', '4_type']
  const arrObj = arr1.map((item) => {
    return { [item]: data[item] }
  })
  const keys = [
    ...new Set(
      arr1.map((item) => {
        return item.split('_')[0]
      })
    )
  ]

  const arrO = []
  for (let k = 0; k < keys.length; k++) {
    let obj = {}
    for (let i = 0; i < arrObj.length; i++) {
      if (Object.keys(arrObj[i])[0].split('_')[0] == keys[k]) {
        obj = { ...obj, ...arrObj[i] }
      }
    }
    arrO.push(obj)
  }

  const result = arrO.reduce((acc: any, item: any) => {
    const key = Object.keys(item)[0].split('_')[0]
    acc.push({
      description: item[`${key}_description`],
      name: item[`${key}_name`]
    })
    return acc
  }, [])

  return result
}
export const transReserve = (data: any) => {
  let num: number = 0
  const {
    departmentCheckup,
    laboratoryCheckup,
    medicalCheckup,
    otherCheckup,
    ...other
  } = data
  let arr: any = []
  //department:[{name:'ss',description:'dd'},{name:'bb',description:'ccc'}]==>
  //[{name:'ss',description:'dd',type:1},{name:'bb',description:'ccc',type:1}]
  if (departmentCheckup?.length > 0) {
    num += departmentCheckup.length
    arr = departmentCheckup.map((item: any) => {
      return { name: item.name, description: item.description, type: 1 }
    })
  }
  if (laboratoryCheckup?.length > 0) {
    num += laboratoryCheckup.length
    const newArr = laboratoryCheckup.map((item: any) => {
      return { name: item.name, description: item.description, type: 2 }
    })
    arr = [...arr, ...newArr]
  }
  if (medicalCheckup?.length > 0) {
    num += medicalCheckup.length
    const newArr = medicalCheckup.map((item: any) => {
      return { name: item.name, description: item.description, type: 3 }
    })
    arr = [...arr, ...newArr]
  }
  if (otherCheckup?.length > 0) {
    num += otherCheckup.length
    const newArr = otherCheckup.map((item: any) => {
      return { name: item.name, description: item.description, type: 4 }
    })
    arr = [...arr, ...newArr]
  }
  arr = arr.map((item: any, index: any) => {
    return {
      [index + '_description']: item.description,
      [index + '_name']: item.name,
      [index + '_type']: item.type
    }
  })
  const result = arr.reduce((prev: any, next: any) => {
    return { ...prev, ...next }
  }, {})
  return { result, num }
}
