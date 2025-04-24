import sqlite3 from 'sqlite3'
import { promisify } from 'util'

const DB_PATH = './corn.db'
const db = new sqlite3.Database(DB_PATH)

export const initDb = () => {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS corn_stock (
        available_units INTEGER
      )`,
      () => {
        db.get(`SELECT COUNT(*) as count FROM corn_stock`, (_, row) => {
          if (row.count === 0) {
            db.run(`INSERT INTO corn_stock (available_units) VALUES (100)`)
          }
        })
      }
    )
    db.run(`
      CREATE TABLE IF NOT EXISTS purchases (
        client_id TEXT,
        timestamp DATETIME,
        quantity INTEGER
    )`,
      () => {
        const defaultClients = ['client1', 'client2', 'client3']
        defaultClients.forEach(clientId => {
          db.run(
            `INSERT INTO purchases (client_id, timestamp, quantity) VALUES (?, ?, ?)`,
            [clientId, null, 0]
          )
        })
      }
    )
  })
}

const dbGet = promisify(db.get.bind(db))
const dbRun = promisify(db.run.bind(db))

export const getLastPurchase = async clientId => {
  const row = await dbGet(
    `SELECT timestamp, quantity FROM purchases WHERE client_id = ? ORDER BY timestamp DESC LIMIT 1`,
    [clientId]
  )
  return row ?? null
}

export const decrementCorn = async () => {
  await dbRun(`UPDATE corn_stock SET available_units = available_units - 1`)
}

export const insertPurchase = async (clientId, timestamp, quantity) => {
  await dbRun(
    `INSERT INTO purchases (client_id, timestamp, quantity) VALUES (?, ?, ?)`,
    [clientId, timestamp, quantity]
  )
}

export const getAvailableCorn = async () => {
  const row = await dbGet(`SELECT available_units FROM corn_stock LIMIT 1`)
  return row?.available_units ?? 0
}
