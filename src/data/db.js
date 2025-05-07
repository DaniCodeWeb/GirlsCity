import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'url';
import path from 'path';

// Solución robusta para la ruta del archivo
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, 'db.json');

// Configuración mejorada de la base de datos
const adapter = new JSONFile(file);
const db = new Low(adapter, {
  usuarios: [],
  productos: [],
  ventas: []
});

// Función de inicialización garantizada
export async function initDB() {
  await db.read();
  if (!db.data) {
    db.data = { usuarios: [], productos: [], ventas: [] };
    await db.write();
  }
  return db;
}

// Inicializa inmediatamente
const { db: initializedDB } = await initDB().catch(err => {
  console.error('Error inicializando DB:', err);
  process.exit(1);
});

export { initializedDB as db, nanoid };