import {error_json_response, json_response} from "~/server/utils/responses";
import {useDB} from "~/server/utils/db";

const db = useDB()

const getPerson = db.prepare('select * from people where id = ?')
const getPersonTransaction = db.transaction((id) => {
    return getPerson.get(id)
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
    const person = getPersonTransaction(id)

    if (!person) {
        event.res.statusCode = 404;
        return error_json_response('Person not found');
    }

    return person
})
