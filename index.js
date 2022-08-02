(async () => {
    const neo4j = require("neo4j-driver");
    require("dotenv").config();
    const fs = require('fs')
    const path = require('path');
    const query = fs.readFileSync(path.join(__dirname, 'people.cql'), 'utf8')

    const {
        NEO4J_URI: uri,
        NEO4J_USERNAME: username,
        NEO4J_PASSWORD: password,
        NEO4J_DATABASE: database
    } = process.env

    const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
    const session = driver.session({ database });

    const person1Name = "Alice";
    const person2Name = "David";

    try {
        // Write transactions allow the driver to handle retries and transient errors
        const writeResult = await session.writeTransaction((tx) =>
            tx.run(query, { person1Name, person2Name })
        );

        console.log(writeResult)
    } catch (error) {
        console.error("Something went wrong: ", error);
    } finally {
        await session.close();
    }
    await driver.close();
})();
