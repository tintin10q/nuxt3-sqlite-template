/* In here create your schema to create your database
*
* You can run this with `npx ts-node schema.ts`
* */

const path = require('path');
const db_name = 'storage.db';
const db_path = path.join(__dirname, db_name);

const Database = require('better-sqlite3'); // https://github.com/JoshuaWise/better-sqlite3/
const db = new Database(db_path, { verbose: console.log });

const createGroup = db.prepare(`
create table if not exists groups (
    id integer primary key,
    name text not null,
    created_at integer default (strftime('%s'))
);`);

const createPerson = db.prepare(`
create table if not exists people (
  id integer primary key, 
  name text,
  description text,
  created_at integer default (strftime('%s')),
  group_id integer,
  FOREIGN KEY (group_id) REFERENCES groups (id) ON UPDATE CASCADE
);`);

const createTablesTransaction = db.transaction(() => {
  createGroup.run();
  createPerson.run();
});

if (typeof require !== 'undefined' && require.main === module) {
  db.pragma('foreign_keys = on')
  createTablesTransaction();
}
