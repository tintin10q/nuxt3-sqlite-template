// Get a connection to the database
import Database from 'better-sqlite3';

export const useDB = () => {
  return new Database('storage.db', {
    // verbose: console.log
    });
};
