const { client } = require('../db');

const connectDB = async () => {
  try {
    // Test connection
    await client.execute('SELECT 1');
    console.log('Turso Database Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
