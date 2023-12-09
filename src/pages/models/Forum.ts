// models/Forum.ts

import mongoose, { Document, Schema } from 'mongoose';

interface IForum extends Document {
  pincode: string;
  textChannels: string[];
}

const forumSchema = new Schema({
  pincode: { type: String, required: true, unique: true },
  textChannels: { type: [String], default: [] },
});

const Forum = mongoose.model<IForum>('Forum', forumSchema);

export { Forum };    export type { IForum };

