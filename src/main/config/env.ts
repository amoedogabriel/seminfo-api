export default {
  mongoURL: process.env.MONGO_URL || 'mongodb://root:root@localhost:27017/',
  port: process.env.PORT || 5050,
  secret: 'secret',
};
