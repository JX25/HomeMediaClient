export default function filterMovieList(list, params){
    console.log("welcome", list, params)
    let tmpList =
     list.filter(x => inArray(x.title.toUpperCase(), params.title.toUpperCase()))
      .filter(x => {
          inArray(x.actors, params.keyword) //||
      //  inArray(x.director, params.keyword) ||
      //  inArray(x.tags, params.keyword)
    })
    .filter(x => equalValue(x.genre, params.genre))
    .filter(x => greaterThan(x.length, params.lengthMin*60))
    .filter(x => lowerThan(x.length, params.lengthMax*60))
    .filter(x => greaterThan(x.year, params.yearMin))
    .filter(x => lowerThan(x.year, params.yearMax))
    console.log("1",tmpList)
    return tmpList
}


function greaterThan(movieVal, paramVal) {
//   console.log("1", movieVal >= paramVal, movieVal, paramVal)
    if(paramVal === 0) return true
    return movieVal >= paramVal
}

function lowerThan(movieVal, paramVal) {
//    console.log(paramVal)
//    console.log("2", movieVal <= paramVal, movieVal, paramVal)
    if(paramVal == 0) return true
    return movieVal <= paramVal
}

function equalValue(movieVal, paramVal) {
//    console.log(paramVal === '')
    if(paramVal === '') return true
    return paramVal.toUpperCase() === movieVal.toUpperCase()
}

function inArray(objArr, paramVal) {
    console.log(objArr, paramVal, objArr.includes(paramVal))
    if(paramVal === '') return true
    return objArr.includes(paramVal)
}