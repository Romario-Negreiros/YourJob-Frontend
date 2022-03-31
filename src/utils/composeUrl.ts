const composeUrl = (data: any, baseUrl: string): string => {
  for (const filter in data) {
    if (data[filter]) {
      if (baseUrl.endsWith('?')) baseUrl += `&${filter}=${data[filter]}`
      else baseUrl += `?${filter}=${data[filter]}&`
    }
  }
  return baseUrl
}

export default composeUrl
