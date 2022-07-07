import {json_response} from "~/server/utils/responses";

export default defineEventHandler((event) => {
  return json_response("pong")
})
