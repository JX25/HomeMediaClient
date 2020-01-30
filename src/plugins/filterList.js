export function filterVideoList(list, params){
    console.log("welcome", list, params)
    let tmpList =list
    .filter(x => inArray(x.title.toUpperCase(), params.title.toUpperCase()))
    .filter(x => inArray(x.tags, params.keyword))
    .filter(x => inArray(x.genre, params.genre))
    .filter(x => greaterThan(x.length, params.lengthMin*60))
    .filter(x => lowerThan(x.length, params.lengthMax*60))
    .filter(x => greaterThan(x.year, params.yearMin))
    .filter(x => lowerThan(x.year, params.yearMax))
    return tmpList
}

export function filterAudioList(list, params){
    let tmpList = list
        .filter(x=>inArray(x.title.toUpperCase(), params.title.toUpperCase()))
        .filter(x=>inArray(x.author.toUpperCase(), params.author.toUpperCase()))
        .filter(x=>inArray(x.album.toUpperCase(), params.album.toUpperCase()))
        .filter(x=>inArray(x.tags, params.keyword))
        .filter(x=>inArray(x.genre, params.genre))
        .filter(x=>greaterThan(x.length, params.lengthMin*60))
        .filter(x=>lowerThan(x.length, params.lengthMax*60))
        .filter(x=>greaterThan(x.year, params.yearMin))
        .filter(x=>lowerThan(x.year, params.yearMax))
        return tmpList
}


function greaterThan(videoVal, paramVal) {
//   console.log("1", videoVal >= paramVal, videoVal, paramVal)
    if(paramVal === 0) return true
    return videoVal >= paramVal
}

function lowerThan(videoVal, paramVal) {
//    console.log(paramVal)
//    console.log("2", videoVal <= paramVal, videoVal, paramVal)
    if(paramVal == 0) return true
    return videoVal <= paramVal
}

/*function equalValue(videoVal, paramVal) {
//    console.log(paramVal === '')
    if(paramVal === '') return true
    return paramVal.toUpperCase() === videoVal.toUpperCase()
}*/

function inArray(obj, paramVal) {
    //console.log(objArr, paramVal, objArr.includes(paramVal))
    if(paramVal === '') return true
    if(Array.isArray(obj)){
        for(let i of obj){
            if(i.includes(paramVal)) return true
        }
    }else{
        return obj.includes(paramVal)
    }
}