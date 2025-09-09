import {
  createComment,
  createUser,
  upvoteComment,
  downvoteComment,
  getNetVotes,
  Comment,
  User,
} from "../src/types/Comment";

describe("Comment", () => {
  const testUser: User = createUser("1", "Test User");

  describe("createUser", () => {
    it("should create a user with id and name", () => {
      const user = createUser("1", "John Doe");

      expect(user.id).toBe("1");
      expect(user.name).toBe("John Doe");
    });
  });

  describe("createComment", () => {
    it("should create a comment with user, content, and default values", () => {
      const comment = createComment("1", testUser, "Test content");

      expect(comment.id).toBe("1");
      expect(comment.user).toBe(testUser);
      expect(comment.content).toBe("Test content");
      expect(comment.upvotes).toBe(0);
      expect(comment.downvotes).toBe(0);
      expect(comment.timestamp).toBeInstanceOf(Date);
    });
  });

  describe("upvoteComment", () => {
    it("should increment upvotes by 1", () => {
      const comment: Comment = {
        id: "1",
        user: testUser,
        content: "Test",
        timestamp: new Date(),
        upvotes: 5,
        downvotes: 2,
      };

      const updatedComment = upvoteComment(comment);

      expect(updatedComment.upvotes).toBe(6);
      expect(updatedComment.downvotes).toBe(2);
      expect(updatedComment.id).toBe(comment.id);
      expect(updatedComment.user).toBe(comment.user);
      expect(updatedComment.content).toBe(comment.content);
      expect(updatedComment.timestamp).toBe(comment.timestamp);
    });
  });

  describe("downvoteComment", () => {
    it("should increment downvotes by 1", () => {
      const comment: Comment = {
        id: "1",
        user: testUser,
        content: "Test",
        timestamp: new Date(),
        upvotes: 5,
        downvotes: 2,
      };

      const updatedComment = downvoteComment(comment);

      expect(updatedComment.upvotes).toBe(5);
      expect(updatedComment.downvotes).toBe(3);
      expect(updatedComment.id).toBe(comment.id);
      expect(updatedComment.user).toBe(comment.user);
      expect(updatedComment.content).toBe(comment.content);
      expect(updatedComment.timestamp).toBe(comment.timestamp);
    });
  });

  describe("getNetVotes", () => {
    it("should calculate net votes (upvotes - downvotes)", () => {
      const comment: Comment = {
        id: "1",
        user: testUser,
        content: "Test",
        timestamp: new Date(),
        upvotes: 10,
        downvotes: 3,
      };

      const netVotes = getNetVotes(comment);

      expect(netVotes).toBe(7);
    });

    it("should handle negative net votes", () => {
      const comment: Comment = {
        id: "1",
        user: testUser,
        content: "Test",
        timestamp: new Date(),
        upvotes: 2,
        downvotes: 5,
      };

      const netVotes = getNetVotes(comment);

      expect(netVotes).toBe(-3);
    });
  });
});
