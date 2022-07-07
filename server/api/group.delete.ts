import {error_json_response, json_response} from "~/server/utils/responses";
import {useDB} from "~/server/utils/db";

/* Create a person */

const db = useDB()

const deleteGroups = db.prepare('delete from groups where id = ?')
const deleteGroupsTransaction = db.transaction((id) => {
    return deleteGroups.run(id)
})


export default defineEventHandler((event) => {

    const url = new URL('https://127.0.0.1' + event.req.url);

    const id = url.searchParams.get('id')
    if (!id) {
        event.res.statusCode = 400;
        return error_json_response('no id in request url');
    }

    if (isNaN(Number(id))) {
        return error_json_response('Could not parse id as number')
    }

    const {changes} = deleteGroupsTransaction(id)
    return {changes}
})
