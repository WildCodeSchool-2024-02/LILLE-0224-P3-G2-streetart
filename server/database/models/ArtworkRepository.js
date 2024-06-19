const AbstractRepository = require("./AbstractRepository");

class ArtworkRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "item" as configuration
    super({ table: "artwork" });
  }

  async readAllMemberArtwork(id) {
// Execute the SQL SELECT query to retrieve a specific category by its ID
const [rows] = await this.database.query(
    `SELECT a.id_artwork, a.title, a.picture, DATE_FORMAT(a.date_creation, '%d-%m-%Y') AS date_creation, a.validate, o.id_operation, o.id_account_fk, o.id_artwork_fk, ac.id_member_fk
FROM artwork AS a
INNER JOIN operation AS o ON id_artwork_fk=id_artwork
INNER JOIN account AS ac ON id_account=id_account_fk
WHERE o.id_account_fk=(?);`,
    [id]
  );

  // Return the first row of the result, which represents the category
  return rows;
}
  
}

module.exports = ArtworkRepository;
