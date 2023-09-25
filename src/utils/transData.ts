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
    departmentCheckup: result1,
    ...(result1.length > 0 &&
      result2.length > 0 && { laboratoryCheckup: result2 }),
    ...(result1.length > 0 &&
      result2.length > 0 &&
      result3.length > 0 && { medicalCheckup: result3 }),
    ...(result4.length > 0 && { otherCheckup: result4 })
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
