import {useDB} from "~/server/utils/db";

const db = useDB()
const getEveryone = db.prepare('select * from people')

export default defineEventHandler((event) => {
    return getEveryone.all()
})
