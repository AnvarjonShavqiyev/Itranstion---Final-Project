export type User = {
    username: string,
    email: string,
    password: string
}
export type Items = {
    tags: string[]
    result: object[]
}
export type Collection = {
    _id: string,
    name:string,
    discreption:string,
    topic:string,
    image:string,
    items:object[]
}