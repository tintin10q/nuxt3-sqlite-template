import {error_json_response} from "~/server/utils/responses";
import {useDB} from "~/server/utils/db";

const db = useDB();
const updateGroup = db.prepare(`update groups set name = coalesce(?, name) where id = ?`)
const updateGroupTransaction = db.transaction(({name, id}) => {return updateGroup.run(name, id)})

export default defineEventHandler((event) => {

    const url = new URL('https://127.0.0.1' + event.req.url);

    const id = url.searchParams.get('id')
    if (!id) {
        event.res.statusCode = 400
        return error_json_response("No id in request")
    }
    const name = url.searchParams.get('name')
    if (!name) {
        event.res.statusCode = 400
        return error_json_response("No name in request")
    }

    const {changes} = updateGroupTransaction({name, id})

    return {changes}
})
