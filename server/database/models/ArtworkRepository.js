const AbstractRepository = require("./AbstractRepository");

class ArtworkRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "artwork" as configuration
    super({ table: "artwork" });
  }

  // The C of CRUD - Create operation

  async create(artwork) {
    // Execute the SQL INSERT query to add a new item to the "artwork" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, picture, date_creation, longitude, latitude) values (?, ?, ?, ?, ?)`,
      [artwork.title, artwork.picture, artwork.date_creation, artwork.longitude, artwork.latitude ]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }
}

module.exports = ArtworkRepository;
