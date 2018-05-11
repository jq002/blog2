import Axios from 'axios'
// 为了让服务端渲染正确请求数据
if(typeof window == "undefined") {
  Axios.defaults.baseURL = 'http://127.0.0.1:8886';
}
export default {
  createToken(username, password) {
    return Axios.post('/api/login', {
      username,
      password
    })
  },
  createTag(name) {
    return Axios.post('/api/tags', {
      name: name
    })
  },
  getAllTags() {
    return Axios.get('/api/tags')
  },
  deleteTag(id) {
    return Axios.delete('/api/tags/' + id)
  },
  getAllArticles(page = 1, limit = 1,tags = '' ) {
    return Axios.get(`/api/articles?tags=${tags}&page=${page}&limit=${limit}`)
  },
  getAllPublishArticles(page = 1, limit = 1,tags ='',searchTitle='') {
    return Axios.get(`/api/publishArticles?tags=${tags}&page=${page}&limit=${limit}&searchTitle=${searchTitle}`)
  },
  createArticle(title, abstract,content, publish, tags) {
    return Axios.post('/api/articles', { title,abstract, content, publish, tags })
  },
  saveArticle(id, article) {
    return Axios.patch('/api/articles/' + id, article)
  },
  publishArticle(id) {
    return Axios.patch('/api/publishArticles/' + id, {
      "publish": true
    })
  },
  notPublishArticle(id) {
    return Axios.patch('/api/publishArticles/' + id, {
      "publish": false
    })
  },
  deleteArticle(id) {
    return Axios.delete('/api/articles/' + id)
  },
  getArticle(id) {
    return Axios.get('/api/articles/' + id)
  }
}
