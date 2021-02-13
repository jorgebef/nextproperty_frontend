export type PropType = {
    [key: string]: any;
    _id: string; // This is the identifier of the document in MongoDB
    created_timestamp: number;
    edited_timestamp?: number;
    ref: string;
    price: number;
    new_build: boolean;
    type: string;
    town: string;
    province: string;
    lat?: number;
    long?: number;
    title: string;
    description?: string;
    images?: Array<string>;
};
