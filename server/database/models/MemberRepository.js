const AbstractRepository = require("./AbstractRepository");

class MemberRepository extends AbstractRepository {
  constructor() {
    super({ table: "member" });
  }

  // The C of CRUD - Create operation => CREATE NEW MEMBER AND ACCOUNT
  async create(member) {
    // CONNECTION BECAUSE DATA GOES INTO TWO TABLES
    const connection = await this.database.getConnection();
    try {
      await connection.beginTransaction();

      // FIRST CONNECTION: Insert the member into the "member" table
      const [memberResult] = await connection.query(
        `INSERT INTO member (firstname, lastname, pseudo, city, postcode) VALUES (?, ?, ?, ?, ?)`,
        [
          member.firstname,
          member.lastname,
          member.pseudo,
          member.city,
          member.postcode,
        ]
      );

      const memberId = memberResult.insertId;

      // SECOND CONNECTION: Insert the account into the "account" table
      await connection.query(
        `INSERT INTO account (email, pwd, id_member_fk, assignment) VALUES (?, ?, ?, ?)`,
        [member.email, member.pwd, memberId, "user"]
      );

      // CONNECTION => COMMIT, ROLLBACK, RELEASE
      await connection.commit();
      return memberId; // Return memberId on success
    } catch (error) {
      await connection.rollback();
      throw error; // Throw error to handle it outside
    } finally {
      connection.release();
    }
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} ORDER BY points DESC`
    );
    return rows;
  }
}

module.exports = MemberRepository;
