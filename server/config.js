
module.exports = {
    app: {
        port: process.env.PORT || 8887,
        baseApi: '/api'
      },
      mongodb: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017/blog'
      },
      jwt: {
        secret: 'jqblog' //used when we create and verify JSON Web Tokens
      },
      mongodbSecret: { //mongodb用户和密码
        user: '',
        pass: ''
      },
      admin: {  //后台初始化的用户名密码
          username: 'admin',
          password: '123456'
      }
  };
  