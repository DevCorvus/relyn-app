import Post from '../models/Post';
import Comment from '../models/Comment';

type PaginationType = 'post' | 'comment';
export type SortByType = 'latest' | 'oldest' | 'mostLiked' | 'mostCommented';

interface PaginateInterface {
  type: PaginationType;
  page: number;
  postId?: string;
  username?: string;
  search?: string;
  sortBy?: SortByType;
}

export async function paginate({
  type,
  page,
  postId,
  username,
  search,
  sortBy,
}: PaginateInterface) {
  let limit: number;
  type === 'post' ? (limit = 10) : (limit = 5);
  const skipIndex = (page - 1) * limit;

  const sortParam = (() => {
    switch (sortBy) {
      case 'latest':
        return { createdAt: 'desc' };

      case 'oldest':
        return {};

      case 'mostLiked':
        return { likes: 'desc' };

      case 'mostCommented':
        return { commentsCount: 'desc' };

      default:
        return { createdAt: 'desc' };
    }
  })();

  const queryConfig = { userId: 0 };

  try {
    if (type === 'post') {
      let posts = null;

      if (username && search && sortBy) {
        posts = await Post.find(
          { username, body: { $regex: search, $options: 'i' } },
          queryConfig
        )
          .sort(sortParam)
          .limit(limit)
          .skip(skipIndex)
          .lean();
      } else if (username && search) {
        posts = await Post.find(
          { username, body: { $regex: search, $options: 'i' } },
          queryConfig
        )
          .sort({ createdAt: 'desc' })
          .limit(limit)
          .skip(skipIndex)
          .lean();
      } else if (username) {
        posts = await Post.find({ username }, queryConfig)
          .sort({ createdAt: 'desc' })
          .limit(limit)
          .skip(skipIndex)
          .lean();
      } else if (search && sortBy) {
        posts = await Post.find(
          { body: { $regex: search, $options: 'i' } },
          queryConfig
        )
          .sort(sortParam)
          .limit(limit)
          .skip(skipIndex)
          .lean();
      } else if (search) {
        posts = await Post.find(
          { body: { $regex: search, $options: 'i' } },
          queryConfig
        )
          .sort({ createdAt: 'desc' })
          .limit(limit)
          .skip(skipIndex)
          .lean();
      } else if (sortBy) {
        posts = await Post.find({}, queryConfig)
          .sort(sortParam)
          .limit(limit)
          .skip(skipIndex)
          .lean();
      } else {
        posts = await Post.find({}, queryConfig)
          .sort({ createdAt: 'desc' })
          .limit(limit)
          .skip(skipIndex)
          .lean();
      }
      return posts;
    } else if (type === 'comment') {
      if (postId) {
        return await Comment.find({ postId }, queryConfig)
          .sort({ createdAt: 'desc' })
          .limit(limit)
          .skip(skipIndex)
          .lean();
      }
      return false;
    }
  } catch (e) {
    return false;
  }
}
