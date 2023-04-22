export default {
  host: process.env.MAIL_HOST || 'smtp.ethereal.email',
  port: process.env.MAIL_PORT || 587,
  secure: process.env.MAIL_SECURE || false,
  user: process.env.MAIL_USER || 'claudie.mills@ethereal.email',
  pass: process.env.MAIL_PASS || 'eN2WNCssXeZ37ChgjB',
  from: process.env.MAIL_FROM || 'Test EMAIL 👻',
};
