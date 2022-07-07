import {error_json_response, json_response} from "~/server/utils/responses";
import {useDB} from "~/server/utils/db";

/* Create a person */

const db = useDB()

const getPerson = db.prepare('select * from person where id = ?')
const getPersonTransaction = db.transaction((id) => {
    getPerson.get(id)
})



export default defineEventHandler((event) => {

    const url = new URL('https://127.0.0.1' + event.req.url);

    // (just name)

    const id = url.searchParams.get('id')
    if (!id) {
        event.res.statusCode = 400;
        return error_json_response('no id in request url');
    }

  return json_response("pong")
})
