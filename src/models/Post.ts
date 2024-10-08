import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Post = mongoose.model('Post', PostSchema);