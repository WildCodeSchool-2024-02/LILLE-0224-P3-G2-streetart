/* eslint-disable no-loss-of-precision */

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
        title: "L'été",
        picture: "/assets/images/artworks/artwork8.png",
        date_creation: `2024-06-13`,
        longitude: 3.0228591932181317,
        latitude: 50.63385933978443,
        validate: true,
      },
      {
        title: "L'hiver",
        picture: "/assets/images/artworks/artwork5.png",
        date_creation: `2024-06-14`,
        longitude: 3.0446955064558257,
        latitude: 50.64068204396465,
        validate: true,
      },
      {
        title: "Le printemp",
        picture: "/assets/images/artworks/artwork4.png",
        date_creation: `2024-06-15`,
        longitude: 3.0446955064558340,
        latitude: 50.64068204396465,
        validate: true,
      },
      {
        title: "L'automne",
        picture: "/assets/images/artworks/artwork3.png",
        date_creation: `2024-06-16`,
        longitude: 3.0446955064558210,
        latitude: 50.64068204396465,
        validate: true,
      },
    ];

    artworks.forEach((artwork) => {
      this.insert(artwork); // insert into artwork(title, picture, date_creation, longitude, latitude, validate) values (?, ?, ?, ?, ?, ?)
    });
  }
}

// Export the artworkSeeder class
module.exports = ArtworkSeeder;
