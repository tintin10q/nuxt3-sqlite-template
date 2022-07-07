import {error_json_response, json_response} from "~/server/utils/responses";
import {useDB} from "~/server/utils/db";

/* Create a person */

const db = useDB()

const insertPerson = db.prepare('insert into people (name, description, group_id) values (?,?,?)')
const getPersonTransaction = db.transaction(({name, description, group_id}) => {
    return insertPerson.run(name, description, group_id)
})


export default defineEventHandler((event) => {

    const url = new URL('https://127.0.0.1' + event.req.url);

    const name = url.searchParams.get('name')
    const description = url.searchParams.get('description')
    const group_id = url.searchParams.get('group_id')
    if (!name) {
        event.res.statusCode = 400;
        return error_json_response('no name in request url');
    }

    const {lastInsertRowid} = getPersonTransaction({name, description, group_id})
    return {id: lastInsertRowid}
})
