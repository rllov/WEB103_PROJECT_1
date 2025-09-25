import { pool } from "./database.js";
import "./dotenv.js";
import heroesData from "../data/HeroesData.js";

const createHeroesTable = async () => {
  const createTableQuery = `
  DROP TABLE IF EXISTS OWHeroes;
  CREATE TABLE IF NOT EXISTS OWHeroes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon TEXT,
    type VARCHAR(100),
    description TEXT,
    health INTEGER,
    armour INTEGER,
    shield INTEGER,
    real_name VARCHAR(255),
    age INTEGER,
    affiliation VARCHAR(255),
    base_of_operations VARCHAR(255),
    linkTo TEXT
  );
`;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 heroes table created successfully");
  } catch (err) {
    console.error("⚠️ error creating heroes table", err);
  }
};
const seedHeroesTable = async () => {
  await createHeroesTable();
  heroesData.forEach((hero) => {
    const insertQuery = {
      text: `INSERT INTO OWHeroes 
    (name, icon, type, description, health, armour, shield, real_name, age, affiliation, base_of_operations, linkTo)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    };
    const values = [
      hero.name,
      hero.icon,
      hero.type,
      hero.description,
      hero.health,
      hero.armour,
      hero.shield,
      hero.real_name,
      hero.age,
      hero.affiliation,
      hero.base_of_operations,
      hero.linkTo,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("Error inserting hero:", err);
      } else {
        console.log("Hero inserted successfully:", hero.name);
      }
    });
  });
};

seedHeroesTable();
