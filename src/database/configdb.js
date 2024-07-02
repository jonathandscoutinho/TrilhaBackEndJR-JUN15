import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// you would have to import / invoke this in another file => documentação npm/sqlite3
export async function openDb () {
  return open({
    filename: 'database/database.db', //nome e caminho do arquivo
    driver: sqlite3.Database //driver default sqlite3
  })
}