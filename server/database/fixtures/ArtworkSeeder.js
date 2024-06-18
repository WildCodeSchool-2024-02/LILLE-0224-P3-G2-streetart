const AbstractSeeder = require("./AbstractSeeder");

class ArtworkSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "artwork", truncate: true });
  }

  // The run method - Populate the 'artwork' table with fake data

  run() {
    const artworks = [
      {
        title: "L'été à Lille",
        picture: "/assets/images/artwork/artwork8.png",
        date: `2024-06-13`,
        longitude: 3.0228591932181317,
        latitude: 50.63385933978443,
        validation: true,
      },
      {
        title: "L'été",
        picture: "/assets/images/artwork/artwork5.png",
        date: `2024-06-13`,
        longitude: 3.0446955064558257,
        latitude: 50.64068204396465,
        validation: true,
      },
    ];

    artworks.forEach((artwork) => {
      this.insert(artwork); // insert into program(title, synopsis, poster, country, year, category_id) values (?, ?, ?, ?, ?, ?)
    });
  }
}

// Export the artworkSeeder class
module.exports = ArtworkSeeder;
