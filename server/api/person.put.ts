import {error_json_response, json_response} from "~/server/utils/responses";
import {useDB} from "~/server/utils/db";

/* Create a person */

const db = useDB()

const updatePerson = db.prepare(`update people set name = coalesce(?, name), 
                                                         description = coalesce(?, description),
                                                         group_id = coalesce(?, group_id) where id = ?`)
const updatePersonTransaction = db.transaction(({id, name, description, group_id}) => {
    return updatePerson.run(name, description, group_id, id)
})


export default defineEventHandler((event) => {

    const url = new URL('https://127.0.0.1' + event.req.url);

    let id = url.searchParams.get('id')

    if (!id) {
        event.res.statusCode = 400;
        return error_json_response('no id in request url');
    }

    let name = url.searchParams.get('name')
    let description = url.searchParams.get('description')
    let group_id = url.searchParams.get('group_id')

    if (isNaN(Number(id))) {
        return error_json_response('Could not parse id as number')
    }

    console.log({id, name, description, group_id})

    const {changes} = updatePersonTransaction({id, name, description, group_id})

    return {changes}
})
