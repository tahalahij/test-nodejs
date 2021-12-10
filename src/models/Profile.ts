import mongoose from "../connections/mongodb";

const { Schema } = mongoose;

export interface IProfile extends mongoose.Document {
    name: string;
    nickname: string;
    email: string;
    divisa: string;
    capital: number;
    preferredCryptocurrency: string;
}

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    divisa: {
        type: String,
        required: true,
        trim: true
    },
    capital: {
        type: Number,
        required: true,
        default: 0,
    },
    preferredCryptocurrency: {
        type: String,
        required: true,
        trim: true
    },
});

export default mongoose.model<IProfile>("Profile", schema);
