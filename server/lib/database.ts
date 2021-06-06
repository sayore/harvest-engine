import Database from "better-sqlite3";
const db = new Database('./foobar.db', { verbose: console.log });


export let permanentDatabase = db;