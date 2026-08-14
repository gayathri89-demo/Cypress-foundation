const { defineConfig } = require("cypress");
const mysql = require('mysql2/promise');
module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      

    on('task', {
      async queryDatabase(query) {
        const connection = await mysql.createConnection({
          host: '127.0.0.1',
          port: 3307,
          user: 'cypress_user',
          password: 'cypress_password',
          database: 'demo_db'
        });

      try {
        const [rows] = await connection.execute(query);
        return rows;
      } finally {
        await connection.end();
      }
    }
  });
  return config;
    },
  },
});



