import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { z } from 'zod';
import { PostSchema } from '../schemas/postSchema';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar post" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const postData = PostSchema.parse(req.body);
    const post = new Post(postData);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Dados inválidos", details: error.errors });
    } else {
      res.status(500).json({ error: "Erro ao criar post" });
    }
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postData = PostSchema.parse(req.body);
    const post = await Post.findByIdAndUpdate(req.params.id, postData, { new: true });
    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }
    res.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Dados inválidos", details: error.errors });
    } else {
      res.status(500).json({ error: "Erro ao atualizar post" });
    }
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar post" });
  }
};