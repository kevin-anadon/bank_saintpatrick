export const removeExtension = (fileName: string) => { 
  return fileName.split('.').shift()
}