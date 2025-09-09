import { Comment, getNetVotes } from "./Comment";

export interface CommentList {
  readonly comments: readonly Comment[];
}

export const sortByVotes = (comments: readonly Comment[]): readonly Comment[] =>
  [...comments].sort((a, b) => getNetVotes(b) - getNetVotes(a));

export const updateComment = (
  comments: readonly Comment[],
  commentId: string,
  updateFn: (comment: Comment) => Comment
): readonly Comment[] => {
  const updatedComments = comments.map((comment) =>
    comment.id === commentId ? updateFn(comment) : comment
  );

  return sortByVotes(updatedComments);
};

export const addComment = (
  comments: readonly Comment[],
  newComment: Comment
): readonly Comment[] => {
  const newComments = [...comments, newComment];
  return sortByVotes(newComments);
};

export const emptyCommentList = (): CommentList => ({
  comments: [],
});

export const createCommentList = (
  comments: readonly Comment[]
): CommentList => ({
  comments: sortByVotes(comments),
});
