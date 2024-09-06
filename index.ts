import fs from 'fs';
import sqlite3, { Database } from 'better-sqlite3';
import makeDB from './makeDB';

export default
class TTKV {
  public constructor(file: string) {
    if (!fs.existsSync(file)) makeDB(file);
    this.db = sqlite3(file);
    db.pragma('journal_mode = WAL');
  }

  private db: Database;
}

const db = sqlite3('3.db');
