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

  async readMember(id) {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await this.database.query(
      `SELECT ac.id_account, ac.email, ac.pwd, ac.id_member_fk, m.id_member, m.firstname, m.lastname, m.pseudo, m.city, m.postcode, m.avatar, m.points
    FROM member AS m
    RIGHT JOIN account AS ac ON id_member=id_member_fk
    WHERE m.id_member=(?);`,
      [id]
    );

    return rows[0];
  }

  async updateMember(memberUpdate) {
    const connection = await this.database.getConnection();

    try {
      // Begin many operations in SQL to be executed at once or all rollback
      await connection.beginTransaction();

      // Execute the SQL UPDATE query to update a specific member
      await connection.query(
        `UPDATE ${this.table} SET city = ?, postcode = ? WHERE id_member = ?`,
        [memberUpdate.city, memberUpdate.postcode, memberUpdate.id]
      );

      await connection.query(
        `UPDATE account SET email = ?, pwd = ? WHERE id_member_fk = ? AND assignment = ?`,
        [memberUpdate.email, memberUpdate.pwd, memberUpdate.id, "user"]
      );
      // CONNECTION => COMMIT, ROLLBACK, RELEASE
      await connection.commit();
      return memberUpdate; // Return member on success
    } catch (error) {
      await connection.rollback();
      throw error; // Throw error to handle it outside
    } finally {
      connection.release();
    }
  }
}

module.exports = MemberRepository;
