const { schedule, api } = require('@serverless/cloud')

const neo4j = require("neo4j-driver");
require("dotenv").config();
const fs = require('fs')
const path = require('path');

const {
    NEO4J_URI: uri,
    NEO4J_USERNAME: username,
    NEO4J_PASSWORD: password,
    NEO4J_DATABASE: database
} = process.env

let driver, session;

async function connectPeople (person1Name, person2Name) {
    const query = fs.readFileSync(path.join(__dirname, 'people.cql'), 'utf8')

    try {
        // Write transactions allow the driver to handle retries and transient errors
        const writeResult = await session.writeTransaction((tx) =>
            tx.run(query, { person1Name, person2Name })
        );

        console.log(writeResult.records)
    } catch (error) {
        console.error("Something went wrong: ", error);
    }
}

// api.get('/', async (req, res) => {
schedule.every('1 minute', async () => {
    driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
    session = driver.session({ database });

    await connectPeople("Alice", "Peter")
    await connectPeople("Alice", "Bob")
    await connectPeople("Bob", "Peter")
    await connectPeople("Calpa", "Peter")

    await session.close()
    await driver.close()
    // res.send('OK')
})