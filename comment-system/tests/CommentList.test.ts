import {
  sortByVotes,
  updateComment,
  addComment,
  createCommentList,
  emptyCommentList,
} from "../src/types/CommentList";
import {
  createComment,
  createUser,
  upvoteComment,
  downvoteComment,
  getNetVotes,
} from "../src/types/Comment";

describe("CommentList", () => {
  const user1 = createUser("1", "Alice");
  const user2 = createUser("2", "Bob");
  const user3 = createUser("3", "Charlie");

  const comment1 = createComment("1", user1, "First comment");
  const comment2 = createComment("2", user2, "Second comment");
  const comment3 = createComment("3", user3, "Third comment");

  describe("sortByVotes", () => {
    it("should sort comments by net votes in descending order", () => {
      const comments = [
        { ...comment1, upvotes: 2, downvotes: 0 },
        { ...comment2, upvotes: 5, downvotes: 1 },
        { ...comment3, upvotes: 1, downvotes: 0 },
      ];

      const sorted = sortByVotes(comments);

      expect(getNetVotes(sorted[0])).toBe(4); // 5 - 1 = 4
      expect(getNetVotes(sorted[1])).toBe(2); // 2 - 0 = 2
      expect(getNetVotes(sorted[2])).toBe(1); // 1 - 0 = 1
    });

    it("should maintain stable sort for equal net votes", () => {
      const comments = [
        { ...comment1, upvotes: 2, downvotes: 0 },
        { ...comment2, upvotes: 2, downvotes: 0 },
        { ...comment3, upvotes: 1, downvotes: 0 },
      ];

      const sorted = sortByVotes(comments);

      expect(getNetVotes(sorted[0])).toBe(2);
      expect(getNetVotes(sorted[1])).toBe(2);
      expect(getNetVotes(sorted[2])).toBe(1);
      expect(sorted[0].id).toBe("1");
      expect(sorted[1].id).toBe("2");
    });

    it("should handle negative net votes", () => {
      const comments = [
        { ...comment1, upvotes: 1, downvotes: 3 },
        { ...comment2, upvotes: 3, downvotes: 1 },
        { ...comment3, upvotes: 0, downvotes: 2 },
      ];

      const sorted = sortByVotes(comments);

      expect(getNetVotes(sorted[0])).toBe(2); // 3 - 1 = 2
      expect(getNetVotes(sorted[1])).toBe(-2); // 1 - 3 = -2
      expect(getNetVotes(sorted[2])).toBe(-2); // 0 - 2 = -2
    });
  });

  describe("updateComment", () => {
    it("should update a comment with upvote and resort the list", () => {
      const comments = [
        { ...comment1, upvotes: 1, downvotes: 0 },
        { ...comment2, upvotes: 3, downvotes: 0 },
        { ...comment3, upvotes: 2, downvotes: 0 },
      ];

      const updated = updateComment(comments, "1", upvoteComment);

      expect(updated[0].id).toBe("2"); // Highest votes (3)
      expect(updated[1].id).toBe("1"); // Second highest (2) - maintains original order with '1'
      expect(updated[2].id).toBe("3"); // Third highest (2) - '3' comes after '1' in original order
      expect(getNetVotes(updated[2])).toBe(2);
    });

    it("should update a comment with downvote and resort the list", () => {
      const comments = [
        { ...comment1, upvotes: 3, downvotes: 0 },
        { ...comment2, upvotes: 2, downvotes: 0 },
        { ...comment3, upvotes: 1, downvotes: 0 },
      ];

      const updated = updateComment(comments, "1", downvoteComment);

      expect(updated[0].id).toBe("1"); // Highest votes (2) - maintains original order
      expect(updated[1].id).toBe("2"); // Second highest (2) - maintains original order
      expect(updated[2].id).toBe("3"); // Lowest (1)
      expect(getNetVotes(updated[0])).toBe(2);
      expect(getNetVotes(updated[1])).toBe(2);
      expect(getNetVotes(updated[2])).toBe(1);
    });

    it("should not change other comments", () => {
      const comments = [
        { ...comment1, upvotes: 1, downvotes: 0 },
        { ...comment2, upvotes: 2, downvotes: 0 },
      ];

      const updated = updateComment(comments, "1", upvoteComment);

      expect(updated[0].id).toBe("1");
      expect(updated[1].id).toBe("2");
      expect(updated[0]).toEqual({ ...comment1, upvotes: 2, downvotes: 0 });
      expect(updated[1]).toEqual({ ...comment2, upvotes: 2, downvotes: 0 });
    });
  });

  describe("addComment", () => {
    it("should add a new comment and sort the list", () => {
      const comments = [
        { ...comment1, upvotes: 3, downvotes: 0 },
        { ...comment2, upvotes: 1, downvotes: 0 },
      ];

      const newComment = { ...comment3, upvotes: 2, downvotes: 0 };
      const updated = addComment(comments, newComment);

      expect(updated.length).toBe(3);
      expect(updated[0].id).toBe("1"); // net votes: 3
      expect(updated[1].id).toBe("3"); // net votes: 2 (new comment)
      expect(updated[2].id).toBe("2"); // net votes: 1
    });
  });

  describe("createCommentList", () => {
    it("should create a comment list and sort comments", () => {
      const comments = [
        { ...comment1, upvotes: 1, downvotes: 0 },
        { ...comment2, upvotes: 3, downvotes: 0 },
        { ...comment3, upvotes: 2, downvotes: 0 },
      ];

      const commentList = createCommentList(comments);

      expect(commentList.comments[0].id).toBe("2"); // net votes: 3
      expect(commentList.comments[1].id).toBe("3"); // net votes: 2
      expect(commentList.comments[2].id).toBe("1"); // net votes: 1
    });
  });

  describe("emptyCommentList", () => {
    it("should create an empty comment list", () => {
      const emptyList = emptyCommentList();

      expect(emptyList.comments).toEqual([]);
    });
  });
});
