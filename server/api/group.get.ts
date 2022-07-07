import {error_json_response, json_response} from "~/server/utils/responses";
import {useDB} from "~/server/utils/db";

const db = useDB()

// const getGroup = db.prepare('select * from groups, people where people.group_id = groups.id and groups.id = ?;')
const getGroup = db.prepare('select * from groups where groups.id = ?;')
const getMembers = db.prepare('select * from people where people.group_id = ?;')
const getGroupTransaction = db.transaction((group_id) => {
    const group = getGroup.get(group_id);
    group.members = getMembers.all(group_id) ?? []
    return group
})

export default defineEventHandler((event) => {
    const url = new URL('https://127.0.0.1' + event.req.url);

    const id = url.searchParams.get('id')
    if (!id) {
        event.res.statusCode = 400
        return error_json_response("No id in request")
    }

    const result = getGroupTransaction(id)

    // console.log(result)


    return result
})
