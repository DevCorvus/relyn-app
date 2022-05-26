import { Request, Response } from 'express';
import Post from '../database/models/Post';
import Comment from '../database/models/Comment';
import { paginate } from '../utils/pagination';
import { getUserUsername } from '../utils/database';

const index = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const page = parseInt(req.query.page as string);

  const comments = await paginate({ type: 'comment', page, postId });
  if (!comments) return res.status(404).send('Comments not found');

  res.status(200).json(comments);
};

const store = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const { postId } = req.params;
  const { body } = req.body as { body: string };

  try {
    const postExists = await Post.exists({ _id: postId });
    if (!postExists) return res.status(404).send('Post not found');

    const username = await getUserUsername(userId);
    if (!username) return res.sendStatus(403);

    const newComment = await Comment.create({
      postId,
      userId,
      username,
      body,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
    res.status(201).json(newComment);
  } catch (e) {
    res.sendStatus(500);
  }
};

const update = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const id = req.params.id;
  const { body } = req.body;

  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).send('Comment not found');
    if (comment.userId !== userId) return res.sendStatus(403);

    await comment.update({
      body,
      edited: true,
      updatedAt: Date.now(),
    });

    return res.status(201).send('Comment updated succesfully');
  } catch (e) {
    res.sendStatus(500);
  }
};

const destroy = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const id = req.params.id;

  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).send('Comment not found');
    if (comment.userId !== userId) {
      const isPostOwner = await Post.exists({ _id: comment.postId, userId });
      if (!isPostOwner) return res.sendStatus(403);
    }

    await Post.findByIdAndUpdate(comment.postId, {
      $inc: { commentsCount: -1 },
    });
    await comment.delete();
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
  }
};

export default {
  index,
  store,
  update,
  destroy,
};
