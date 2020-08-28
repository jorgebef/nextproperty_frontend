export type PropType = {
    _id: string;
    ref: string;
    title: string;
    created_timestamp: number;
    description?: string | undefined;
    images?: Array<string> | undefined;
};

export const propertyDefault = {
    _id: '',
    ref: '',
    title: '',
    created_timestamp: 0,
    description: '',
    images: [],
};

export const APIURL = 'http://localhost:5000';
