import React, { useState } from "react";
import { Comment as CommentComponent } from "./Comment";
import {
  Comment as CommentType,
  createComment,
  createUser,
  upvoteComment,
  downvoteComment,
} from "../types/Comment";
import { updateComment, addComment } from "../types/CommentList";

interface CommentSystemProps {
  readonly initialComments?: readonly CommentType[];
}

export const CommentSystem: React.FC<CommentSystemProps> = ({
  initialComments = [
    createComment(
      "1",
      createUser("1", "Naresh Jain"),
      "Great discussion! I really enjoyed the technical details."
    ),
    createComment(
      "2",
      createUser("2", "MD Aman Khan"),
      "Thanks for sharing this. Very informative."
    ),
    createComment(
      "3",
      createUser("3", "Alice Johnson"),
      "I have a question about the implementation approach."
    ),
    createComment("4", createUser("4", "Bob Smith"), "Excellent explanation!"),
  ],
}) => {
  const [comments, setComments] =
    useState<readonly CommentType[]>(initialComments);

  const handleUpvote = (commentId: string) => {
    setComments((currentComments) =>
      updateComment(currentComments, commentId, upvoteComment)
    );
  };

  const handleDownvote = (commentId: string) => {
    setComments((currentComments) =>
      updateComment(currentComments, commentId, downvoteComment)
    );
  };

  const handleAddComment = () => {
    const newComment = createComment(
      Date.now().toString(),
      createUser("5", "New User"),
      "This is a new comment that will be sorted by likes!"
    );

    setComments((currentComments) => addComment(currentComments, newComment));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Comment System</h2>

      <button
        onClick={handleAddComment}
        style={{
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Add New Comment
      </button>

      <div>
        {comments.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#666",
              fontStyle: "italic",
            }}
          >
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentComponent
              key={comment.id}
              comment={comment}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
            />
          ))
        )}
      </div>
    </div>
  );
};
