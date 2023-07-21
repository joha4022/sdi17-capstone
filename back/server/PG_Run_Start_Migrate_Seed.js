require('dotenv').config()
const { execSync } = require('child_process');

// Define container name, database name, and postgres password
const containerName = 'smeid';
const mountDataTo = '$HOME/docker/volumes/postgres2'
const databaseName = 'smeid';
const password = 'docker' //process.env.POSTGRES_PASSWORD;

try {// Check if the container exists
    execSync(`docker inspect --type container ${containerName}`);
    console.log('Container exists.');
} catch (error) {// Container does not exist, create and start it
    try {
        execSync(`docker run --name ${containerName} -e POSTGRES_PASSWORD=${password} -d -p 5432:5432 -v ${mountDataTo}:/var/lib/postgresql/data postgres`);
        console.log('Container created and started.');
    } catch (error) {
        console.error('Error creating or starting the container:', error.message);
        process.exit(1);
    }
}

try {// Check if the container is running
  execSync(`docker inspect --format="{{.State.Running}}" ${containerName}`);
  console.log('Container is running.');
} catch (error) {// Container is not running, start it

  try {
    execSync(`docker start ${containerName}`);
    console.log('Container started.');
  } catch (error) {
    console.error('Error starting the container:', error.message);
    process.exit(1);
  }
}

try {// Check if the database exists
    execSync(`docker exec ${containerName} psql -U postgres -lqt | cut -d '|' -f 1 | grep -w ${databaseName}`);
    console.log('Database exists.');
} catch (error) {// Database does not exist, create it
    try {
        execSync(`docker exec ${containerName} createdb -U postgres ${databaseName}`);
        console.log('Database created.');
    } catch (error) {
        console.error('Error creating the database:', error.message);
        process.exit(1);
    }
}

try {// Rollback all migrations
    execSync(`npx knex migrate:rollback --all`);
    console.log('Migrations rolled back successfully.');
} catch (error) {// Rollback error
    console.error('Error rolling back migrations:', error.message);
    process.exit(1);
}

try {// Run latest migrations
    execSync(`npx knex migrate:latest`);
    console.log('Migrations applied successfully.');
} catch (error) { // Migrate error
    console.error('Error running migrations:', error.message);
    process.exit(1);
}

try {// Run seed files
    execSync(`npx knex seed:run`);
    console.log('Seed files executed successfully.');
} catch (error) { // Seed error
    console.error('Error running seed files:', error.message);
    process.exit(1);
}