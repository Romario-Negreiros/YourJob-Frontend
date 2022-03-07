const convertFileObj = (file: File): string => {
  if (file) {
    const newObj = {
      arrayBuffer: file.arrayBuffer,
      lastModified: file.lastModified,
      name: file.name,
      size: file.size,
      slice: file.slice,
      stream: file.stream,
      text: file.text,
      type: file.type,
      webkitRelativePath: file.webkitRelativePath
    }

    return JSON.stringify(newObj)
  }
  return ''
}

export default convertFileObj
