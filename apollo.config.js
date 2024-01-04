module.exports = {
  client: {
    service: {
      name: 'zammad',
      url: 'http://localhost:4000/graphql',
    },
    includes: [
      './packages/frontend/src/graphql/**/*.graphql',
    ],
  },
}
