import Axios from 'axios'

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
  getAllPublishArticles(page = 1, limit = 1,tags ='') {
    return Axios.get(`/api/publishArticles?tags=${tags}&page=${page}&limit=${limit}`)
  },
  createArticle(title, content, publish, tags) {
    return Axios.post('/api/articles', { title, content, publish, tags })
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
