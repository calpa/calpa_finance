MERGE (p1:Person { name: $person1Name })-[:KNOWS]->(p2:Person { name: $person2Name })
ON CREATE
SET p1.createdAt = datetime(), p2.createdAt = datetime()
ON MATCH
SET p1.modifiedAt = datetime(), p2.modifiedAt = datetime()
RETURN p1, p2