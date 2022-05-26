import type { Request, Response } from 'express';
import val from 'validator';
import Comment from '../database/models/Comment';
import Post, { PostInterface } from '../database/models/Post';
import { paginate, SortByType } from '../utils/pagination';
import { getUserUsername } from '../utils/database';

interface PostDataInterface {
  body: string;
  imageUrl: string;
}

const index = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string);
  const username = req.query.username as string;
  const search = req.query.search as string;
  const sortBy = req.query.sortBy as SortByType;

  const posts = await paginate({
    type: 'post',
    page,
    username,
    search,
    sortBy,
  });
  if (!posts) return res.status(404).send('Posts not found');

  res.status(200).json(posts);
};

const show = async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found');

    res.status(200).json(post);
  } catch (e) {
    res.sendStatus(500);
  }
};

const store = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const { body, imageUrl: imageUrlFromClient } = req.body as PostDataInterface;

  let imageUrlToSave = '';

  if (imageUrlFromClient) {
    const regexIsImage = /\.(jpg|png|jpeg|webp|gif|bmp)/i;
    if (
      val.isURL(imageUrlFromClient) &&
      regexIsImage.test(imageUrlFromClient)
    ) {
      imageUrlToSave = imageUrlFromClient;
    } else {
      return res.status(409).send("imageUrl isn't an Image URL");
    }
  }

  try {
    const username = await getUserUsername(userId);
    if (!username) return res.sendStatus(500);

    const newPost: PostInterface = await Post.create({
      userId,
      username,
      body,
      imageUrl: imageUrlToSave,
      likes: [],
      edited: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return res.status(201).json(newPost);
  } catch (err) {
    res.sendStatus(500);
  }
};

const update = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const userId = res.locals.userId;
  const { body, imageUrl: imageUrlFromClient } = req.body as PostInterface;

  let imageUrlToSave = '';

  if (imageUrlFromClient) {
    const regexIsImage = /\.(jpg|png|jpeg|webp|gif|bmp)/i;
    if (
      val.isURL(imageUrlFromClient) &&
      regexIsImage.test(imageUrlFromClient)
    ) {
      imageUrlToSave = imageUrlFromClient;
    } else {
      return res.status(409).send("imageUrl isn't an Image URL");
    }
  }

  const post = await Post.findById(postId);
  if (post) {
    try {
      if (userId === post.userId) {
        await post.update({
          body,
          imageUrl: imageUrlToSave,
          edited: true,
          updatedAt: Date.now(),
        });

        return res.status(201).send('Post updated successfully');
      }
      return res.sendStatus(401);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
  res.status(404).send('Post not found.');
};

const destroy = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const userId = res.locals.userId;
  const post = await Post.findById(postId);

  if (post) {
    if (userId === post.userId) {
      try {
        await Comment.deleteMany({ postId });
        await post.delete();
        return res.status(204).send('Post deleted successfully');
      } catch (err) {
        return res.sendStatus(500);
      }
    }
    return res.sendStatus(401);
  }
  res.status(404).send('Post not found');
};

const like = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found');

    const username = await getUserUsername(userId);
    if (!username) return res.sendStatus(500);

    const postAlreadyLiked =
      post.likes.filter((like) => like.username === username).length > 0;
    if (postAlreadyLiked) {
      post.likes = post.likes.filter((like) => like.username !== username);
      await post.save();
      return res.status(201).send('Unliked');
    }

    post.likes.push({
      username,
      createdAt: Date.now(),
    });
    await post.save();

    res.status(201).send('Liked');
  } catch (e) {
    res.sendStatus(500);
  }
};

export default {
  index,
  show,
  store,
  update,
  destroy,
  like,
};
