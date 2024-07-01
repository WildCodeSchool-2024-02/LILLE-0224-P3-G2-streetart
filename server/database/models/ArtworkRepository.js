const AbstractRepository = require("./AbstractRepository");

class ArtworkRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "artwork" as configuration
    super({ table: "artwork" });
  }

  // The C of CRUD - Create operation
  async create(artwork) {
    // CONNECTION BECAUSE DATA GOES INTO TWO TABLES
    const connection = await this.database.getConnection();
    try {
      await connection.beginTransaction();

      // FIRST CONNECTION: Insert the member into the "artwork" table
      const [artworkResult] = await connection.query(
        `insert into ${this.table} (title, picture, date_creation, longitude, latitude) values (?, ?, ?, ?, ?)`,
        [
          artwork.title,
          artwork.picture,
          artwork.date_creation,
          artwork.longitude,
          artwork.latitude,
        ]
      );

      const artworkId = artworkResult.insertId;

      // SECOND CONNECTION: Insert the account into the "operation" table
      await connection.query(
        `INSERT INTO operation (kind, details, date_operation, id_account_fk, id_artwork_fk) VALUES (?, ?, ?, ?, ?)`,
        [
          "ajout",
          "Nouvelle oeuvre",
          artwork.date_creation,
          artwork.id_account_fk,
          artworkId,
        ]
      );

      // CONNECTION => COMMIT, ROLLBACK, RELEASE
      await connection.commit();
      return artworkId; // Return artworkId on success
    } catch (error) {
      await connection.rollback();
      throw error; // Throw error to handle it outside
    } finally {
      connection.release();
    }
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await this.database.query(
      `SELECT a.*, DATE_FORMAT(a.date_creation, '%d-%m-%Y') AS date_creation, m.pseudo, m.points
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
      ORDER BY date_creation DESC`
    );

    // Return the array of items
    return rows;
  }

  async readAllMemberArtwork(id) {
    // Execute the SQL SELECT query to retrieve all artworks from the account
    const [rows] = await this.database.query(
      `SELECT a.id_artwork, a.title, a.picture, DATE_FORMAT(a.date_creation, '%d-%m-%Y') AS date_creation, a.validate, o.id_operation, o.date_operation, o.id_account_fk, o.id_artwork_fk, ac.id_member_fk
    FROM artwork AS a
    INNER JOIN operation AS o ON id_artwork_fk=id_artwork
    INNER JOIN account AS ac ON id_account=id_account_fk
    WHERE ac.id_member_fk=(?)
    ORDER BY a.id_artwork DESC;`,
      [id]
    );

    return rows;
  }

  async reportArtwork(id) {
    // Execute the SQL SELECT query to retrieve all artworks from the account
    const [rows] = await this.database.query(
      `UPDATE artwork SET reported = ? WHERE id_artwork = ?`,
      [1, id]
    );

    return rows;
  }
}

module.exports = ArtworkRepository;
