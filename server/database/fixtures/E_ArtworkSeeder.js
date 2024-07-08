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
        picture: "/assets/images/artworks/artwork1.png",
        date_creation: "2024-06-13",
        longitude: 3.0228591932181317,
        latitude: 50.63385933978443,
        validate: true,
      },
      {
        title: "Le froid",
        picture: "/assets/images/artworks/artwork2.png",
        date_creation: "2024-06-13",
        longitude: 3.0446955064558257,
        latitude: 50.64068204396465,
        validate: true,
      },
      {
        title: "L'hiver",
        picture: "/assets/images/artworks/artwork3.png",
        date_creation: "2024-04-16",
        longitude: 3.072233,
        latitude: 50.637452,
        validate: true,
      },
      {
        title: "L'automne",
        picture: "/assets/images/artworks/artwork4.png",
        date_creation: "2024-02-23",
        longitude: 3.06674,
        latitude: 50.63092,
        validate: true,
      },
      {
        title: "Le printemps",
        picture: "/assets/images/artworks/artwork5.png",
        date_creation: "2024-06-13",
        longitude: 3.15463,
        latitude: 50.685332,
        validate: true,
      },
      {
        title: "Le matin",
        picture: "/assets/images/artworks/artwork6.png",
        date_creation: "2024-01-06",
        longitude: 3.149137,
        latitude: 50.708818,
        validate: true,
      },
      {
        title: "Le midi",
        picture: "/assets/images/artworks/artwork7.png",
        date_creation: "2024-02-13",
        longitude: 3.160124,
        latitude: 50.695337,
        validate: true,
      },
      {
        title: "Le soir",
        picture: "/assets/images/artworks/artwork8.png",
        date_creation: "2024-06-03",
        longitude: 3.0446955064558259,
        latitude: 50.64068204396455,
        validate: true,
      },
      {
        title: "La nuit",
        picture: "/assets/images/artworks/artwork1.png",
        date_creation: "2024-05-29",
        longitude: 3.16081,
        latitude: 50.725773,
        validate: true,
      },
      {
        title: "La pause",
        picture: "/assets/images/artworks/artwork2.png",
        date_creation: "2024-02-04",
        longitude: 3.066053,
        latitude: 50.643984,
        validate: true,
        reported: true,
      },
      {
        title: "Le moment",
        picture: "/assets/images/artworks/artwork5.png",
        date_creation: "2024-04-10",
        longitude: 3.168363,
        latitude: 50.714036,
        validate: false,
      },
    ];

    artworks.forEach((artwork) => {
      this.insert(artwork); // insert into artwork(title, picture, date_creation, longitude, latitude, validate) values (?, ?, ?, ?, ?, ?)
    });
  }
}

// Export the artworkSeeder class
module.exports = ArtworkSeeder;
