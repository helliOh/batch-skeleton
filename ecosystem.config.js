module.exports = {
    apps : [
        {
          name: "app:batch",
          script: "./bin/www",
          watch: true,
          env: {
            NODE_ENV : 'development',
            PRODUCTION : false,
            SEED : false,
            FORCE : false,
            PORT : 8000
          },
          env_production: {
            NODE_ENV : 'production',
            PRODUCTION : true,
            SEED : false,
            FORCE : false,
            PORT : 8000
          }
        }
    ]
  }