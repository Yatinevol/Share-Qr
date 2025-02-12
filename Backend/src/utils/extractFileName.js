const extractFileName = (url)=>{
    const partsArr = url.split('/')
    const lastPartOfArr = partsArr[partsArr.length - 1].split('.')
    const fileName = lastPartOfArr[0]
    return fileName
}

export default extractFileName