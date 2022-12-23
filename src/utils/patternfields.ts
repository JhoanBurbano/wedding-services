export function fieldsToBD(body: Record<string, any>){
    for(let property in body){
        if(typeof property === 'string'){
            let value = body[property]
            body[property] = value.trim().toLocaleLowerCase()
        }
    }
    return body
}