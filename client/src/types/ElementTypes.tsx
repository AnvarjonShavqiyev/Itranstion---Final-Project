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
export type Comment = {
    userId: string;
    text: string;
};
export type Item = {
    _id: string,
    image: string,
    tags: string,
    name: string,
    like: number,
    comments: Comment[]
}
export type KeySearchResult = {
    collections: Collection[]
    comments: Comment[]
}