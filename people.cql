MERGE (p1:Person { name: $person1Name })
MERGE (p2:Person { name: $person2Name })
MERGE (p1)-[:KNOWS]->(p2)
ON CREATE
SET p1.createdAt = datetime(), p2.createdAt = datetime()
ON MATCH
SET p1.modifiedAt = datetime(), p2.modifiedAt = datetime()
RETURN p1, p2