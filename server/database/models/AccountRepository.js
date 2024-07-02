const AbstractRepository = require("./AbstractRepository");

class AccountRepository extends AbstractRepository {
  constructor() {
    super({ table: "account" });
  }

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `SELECT a.*, m.*
        FROM ${this.table} AS a
        INNER JOIN member AS m ON id_member=id_member_fk
        WHERE a.email= (?);`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async verifyEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `SELECT a.email, a.id_account, a.id_member_fk, m.firstname, m.pseudo
        FROM ${this.table} AS a
        INNER JOIN member AS m ON id_member=id_member_fk
        WHERE a.email=(?);`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async editPwd(account) {
    // Execute the SQL UPDATE query to update the password
    const [result] = await this.database.query(
      `update ${this.table} set pwd = ? where id_account = ?`,
      [account.pwd, account.id]
    );
  
    // Return how many rows were affected
    return result.affectedRows;
  }
}

module.exports = AccountRepository;
