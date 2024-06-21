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

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await this.database.query(
      `SELECT a.*, DATE_FORMAT(a.date_creation, '%d %m %Y') AS date_creation, m.pseudo, m.points
      FROM artwork AS a
      INNER JOIN operation AS o ON id_artwork_fk=id_artwork
      INNER JOIN account AS ac ON id_account=id_account_fk
      INNER JOIN member AS m ON id_member=id_member_fk
      WHERE id_artwork=(?);`,
      [id]
    );

    // Return the first row of the result, which represents the category
    return rows[0];
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

  return rows;
}
 
}

module.exports = ArtworkRepository;
