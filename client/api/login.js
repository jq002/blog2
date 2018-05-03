import Axios from 'axios'

export default {
    createToken(username,password){
        return Axios.post('/api/login',{username,password})
    },
    createTag(name){
        return Axios.post('/api/tags',{name:name})
    },
    getAllTags(){
        return Axios.get('/api/tags')
    },
    deleteTag(id){
        return Axios.delete('/api/tags/'+id)
    }
}