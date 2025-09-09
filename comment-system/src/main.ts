export { CommentSystem } from "./components/CommentSystem";
export { Comment } from "./components/Comment";

export type { Comment as CommentType, User } from "./types/Comment";
export {
  createComment,
  createUser,
  upvoteComment,
  downvoteComment,
  getNetVotes,
} from "./types/Comment";
export type { CommentList } from "./types/CommentList";
export { sortByVotes, updateComment, addComment } from "./types/CommentList";
