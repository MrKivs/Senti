import Dexie from "dexie";

export const db = new Dexie("sentiDB")
db.version(1).stores({
    contributions: "++id, date, amount",
})