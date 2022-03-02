module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '588633daa0f0e9331b0bd8888da1e966'),
  },
});
