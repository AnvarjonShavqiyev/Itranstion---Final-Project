export type User = {
    _id:string,
    name: string,
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
    name: string;
    text: string;
    item_id: string;
};
export type Item = {
    _id: string,
    image: string,
    tags: string,
    name: string,
    likes: string[],
    comments: Comment[],
    additionalInfo: object[]
}
export type KeySearchResult = {
    collections: Collection[]
    comments: Comment[]
    items: Item[]
}