const AbstractRepository = require("./AbstractRepository");

class ArtworkRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "artwork" as configuration
    super({ table: "artwork" });
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all artworks from the "artwork" table
    const [rows] = await this.database.query(
      `SELECT id_artwork, title, picture, DATE_FORMAT(date_creation, '%d-%m-%Y') AS formatted_date, longitude, latitude, validate
     FROM ${this.table} 
     WHERE validate = true 
     ORDER BY date_creation ASC`
    );

    // Return the array of items
    return rows;
  }
}

module.exports = ArtworkRepository;
