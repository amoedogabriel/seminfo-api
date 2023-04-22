export default {
  host: process.env.MAIL_HOST || 'smtp.ethereal.email',
  port: process.env.MAIL_PORT || 587,
  user: process.env.MAIL_USER || 'claudie.mills@ethereal.email',
  pass: process.env.MAIL_PASS || 'eN2WNCssXeZ37ChgjB',
  from: process.env.FROM || 'Test EMAIL 👻',
};