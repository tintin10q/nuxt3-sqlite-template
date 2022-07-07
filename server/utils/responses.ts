export const error_json_response = (text: string) => ({ error: text });

export const json_response = (text: string, extra: Record<string, JsonOk> = {}) => ({ message: text, ...extra });

type JsonOk = string | number | null | boolean
