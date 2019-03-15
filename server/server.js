const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    console.log("err: ", err);
    throw err;
  }
  console.log("db connected");
});

const app = express();
app.use(cors());
app.use(express.json());

app.set("port", process.env.PORT || 3001);

app.get('/getNPCs', (req, res) => {
  let sql = 'SELECT * FROM new_schema.npcs';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/add', (req, res) => {
  console.log("add req body: ", req.body);
  let sql = 'INSERT INTO new_schema.npcs (name, level, title, class, race, currentHP, maxHP, ac, thac0, str, ex_str,\
    intel, dex, con, wis, cha, memorized, SBLvl_1, SBLvl_2, SBLvl_3, SBLvl_4, SBLvl_5, gold, weapon, items, probity,\
    affiliation, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [req.body.name, req.body.level, req.body.title, req.body.class, "", req.body.currentHP,
  req.body.maxHP, req.body.ac, req.body.thac0, req.body.str, req.body.ex_str, req.body.int, req.body.dex, req.body.con,
  req.body.wis, req.body.cha, req.body.memorized, req.body.spellbookLvl_1, req.body.spellbookLvl_2,
  req.body.spellbookLvl_3, req.body.spellbookLvl_4, req.body.spellbookLvl_5, req.body.gold, req.body.weapon, req.body.items,
  req.body.probity, req.body.affiliation, req.body.notes], (err, result) => {
    if (err) {
      console.log("error: ", err);
      throw err;
    }
    res.send(result);
  });
});

app.put('/update', (req, res) => {
  console.log("update req body: ", req.body);
  let sql = 'UPDATE new_schema.npcs SET level=?, title=?, class=?, race=?, currentHP=?, maxHP=?, ac=?, thac0=?, str=?,\
    ex_str=?, intel=?, dex=?, con=?, wis=?, cha=?, memorized=?, SBLvl_1=?, SBLvl_2=?, SBLvl_3=?, SBLvl_4=?, SBLvl_5=?,\
    gold=?, weapon=?, items=?, probity=?, affiliation=?, notes=? WHERE name=?';
  db.query(sql, [req.body.level, req.body.title, req.body.class, "", req.body.currentHP,
  req.body.maxHP, req.body.ac, req.body.thac0, req.body.str, req.body.ex_str, req.body.int, req.body.dex, req.body.con,
  req.body.wis, req.body.cha, req.body.memorized, req.body.spellbookLvl_1, req.body.spellbookLvl_2,
  req.body.spellbookLvl_3, req.body.spellbookLvl_4, req.body.spellbookLvl_5, req.body.gold, req.body.weapon, req.body.items,
  req.body.probity, req.body.affiliation, req.body.notes, req.body.name], (err, result) => {
    if (err) {
      console.log("error: ", err);
      throw err;
    }
    res.send(result);
  });
});

app.listen('3001', () => {
  console.log("Listening on port 3001");
});
