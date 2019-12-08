import {movieApi} from '../api'

export default {
    namespaced: true,
    state:{
        movies: []
    },
    mutations:{
        setMovies(state, movies){
            state.movies = movies
        },
    },
    getters:{
        movies: state => {return state.movies},
    },
    actions:{
        allMovies: ({commit}) => {
            return new Promise( (res, rej) => {
                movieApi.get('all',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                    .then(result => {
                        console.log(result.data.response)
                        commit('setMovies', result.data.response)
                        res(result)

                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        }
    }
}