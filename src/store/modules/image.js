import {imageApi, authHeader} from '../api'

export default {
    namespaced: true,
    state:{
        images: [],
        image: {},
        imageToEdit: {},
        uploadImage: {},
        uploadMetaData: {},
        info: [],
        showInfo: [],
    },
    mutations:{
        setImages(state, images){
            state.images = images
        },
        setImage(state, image){
            state.image = image
        },
        setImageToEdit(state, image){
            state.imageToEdit = image
        },
        setUploadImage(state, data){
            state.uploadImage = data
        },
        setImageMetaData(state, data){
            state.uploadMetaData = data
        },
        removeImage(state, image){
            let i = state.images.map(x => {return x._id}).indexOf(image._id)
            delete state.images[i]
        },
        clearUpload(state){
            state.uploadImage = ''
            state.uploadImageThumbnail = ''
            state.uploadMetaData = ''
        },
        setInfo(state, info){
            state.info.push(info)
        },
        infoVisible(state, value){
            state.showInfo = value
        },
        clearInfo(state){
            state.info = []
        }
    },
    getters:{
        editImage: state => {return state.imageToEdit},
        image: state => {return state.image},
        images: state => {return state.images},
        imageBySlug: (state, slug) => {return state.images.filter(image => {image.slug === slug})},
        uploadImage: state => {return state.uploadImage},
        uploadMetaData: state => {return state.uploadMetaData},
        infoVisibility: state => {return state.showInfo},
        imageInfo: state => {return state.info}
    },
    actions:{
        hideInfo : ({commit}) => {
            commit("infoVisible", false)
        },
        showInfo : ({commit}) => {
            commit("infoVisible", true)
        },
        setInfo : ({commit}, info) => {
            commit("setInfo", info)
        },
        clearInfo : ({commit}) => {
            commit("clearInfo")
        },
        imagePreview: ({commit}, image) => {
            commit("setImage", image)
        },
        imageToEdit: ({commit}, image) => {
            commit("setImageToEdit", image)
        },
        imageBySlug: ({commit}, slug) => {
            return new Promise((res, rej) => {
                imageApi.get(slug + '/detail', authHeader())
                    .then(result => {
                        console.log(result.data.response)
                        commit('setImage', result.data.response)
                        res(result)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        allImages: ({commit}, age) => {
            return new Promise((res, rej) => {
                imageApi.get('/with-age-rate/all/' + age, authHeader())
                    .then(result => {
                        console.log(result.data.response)
                        commit('setImages', result.data.response)
                        res(result)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        uploadMetaData: ({commit}, payload) => {
            return new Promise((res, rej) => {
                imageApi.post("", payload, authHeader())
                    .then(result => {
                        console.log("ZZZZ", result)
                        commit('setUploadMetaData', result)
                        res(result.data.response)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })

        },
        updateMetaData: ({commit}, payload)=>{
            return new Promise( (res, rej) => {
                imageApi.put(payload.OLDslug, payload, authHeader())
                    .then(result => {
                        console.log(result)
                        commit('setImageMetaData', result)
                        res(result.data.response)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        uploadImage: ({commit}, payload) => {
            let formData = new FormData()
            formData.append("file", payload.file)
            return new Promise((res, rej) => {
                imageApi.patch('upload/' + payload.slug, formData, authHeader())
                    .then(result => {
                        commit('setUploadImage', result)
                        res(result)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        },
        deleteImage: ({commit}, image) => {
            return new Promise((res, rej) => {
                imageApi.delete(image.slug, authHeader())
                    .then(result => {
                        console.log(result)
                        commit('removeImage', image)
                        res(result)
                    })
                    .catch(error => {
                        rej(error)
                    })
            })
        }
    },

}