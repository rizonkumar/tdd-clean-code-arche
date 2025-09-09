export interface Comment {
  readonly id: string;
  readonly user: User;
  readonly content: string;
  readonly timestamp: Date;
  readonly upvotes: number;
  readonly downvotes: number;
}

export interface User {
  readonly id: string;
  readonly name: string;
}

export const createComment = (
  id: string,
  user: User,
  content: string
): Comment => ({
  id,
  user,
  content,
  timestamp: new Date(),
  upvotes: 0,
  downvotes: 0,
});

export const upvoteComment = (comment: Comment): Comment => ({
  ...comment,
  upvotes: comment.upvotes + 1,
});

export const downvoteComment = (comment: Comment): Comment => ({
  ...comment,
  downvotes: comment.downvotes + 1,
});

export const getNetVotes = (comment: Comment): number =>
  comment.upvotes - comment.downvotes;

export const createUser = (id: string, name: string): User => ({
  id,
  name,
});
