import {json_response} from "~/server/utils/responses";
import {useDB} from "~/server/utils/db";

const db = useDB()
const getGroups = db.prepare('select * from groups')


export default defineEventHandler((event) => {
  return getGroups.all()
})
