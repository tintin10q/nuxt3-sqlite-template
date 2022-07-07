import {error_json_response} from "~/server/utils/responses";
import {useDB} from "~/server/utils/db";

const db = useDB();
const createGroup = db.prepare('insert into groups (name) values (?)')
const createGroupTransaction = db.transaction((name) => {
    return createGroup.run(name)
})

export default defineEventHandler((event) => {

    const url = new URL('https://127.0.0.1' + event.req.url);

    const name = url.searchParams.get('name')
    if (!name) {
        event.res.statusCode = 400
        return error_json_response("No name in request")
    }

    const {lastInsertRowid} = createGroupTransaction(name)

    return {id: lastInsertRowid}
})
