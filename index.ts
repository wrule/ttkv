import fs from 'fs';
import sqlite3, { Database } from 'better-sqlite3';
import makeDB from './makeDB';

export default
class TTKV {
  public constructor(file: string) {
    if (!fs.existsSync(file)) makeDB(file);
    this.db = sqlite3(file);
    this.db.pragma('journal_mode = WAL');
  }

  private db: Database;

  public async set(key: string, value: string) {
    const insertStmt = this.db.prepare(`INSERT OR IGNORE INTO ttkv (createTime, updateTime, key, value) VALUES (?, ?, ?, ?)`);
    const updateStmt = this.db.prepare(`UPDATE ttkv SET value = ?, updateTime = ? WHERE key = ?`);
    const time = Date.now();
    await insertStmt.run(time, time, key, value);
    await updateStmt.run(value, time, key);
  }

  public async get(key: string) {
    const selectStmt = this.db.prepare(`SELECT value FROM ttkv WHERE key = ?`);
    const item = await selectStmt.get(key) as { value: string } | undefined;
    return item?.value;
  }
}

async function main() {
  const tt = new TTKV('3.db');
  await tt.set('鸡毛', '爱你12343');
  console.log(await tt.get('鸡毛'));
  
}

main();
