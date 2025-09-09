import React from "react";
import { Comment as CommentType, getNetVotes } from "../types/Comment";

interface CommentProps {
  readonly comment: CommentType;
  readonly onUpvote: (commentId: string) => void;
  readonly onDownvote: (commentId: string) => void;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  onUpvote,
  onDownvote,
}) => {
  const handleUpvoteClick = () => {
    onUpvote(comment.id);
  };

  const handleDownvoteClick = () => {
    onDownvote(comment.id);
  };

  const formatTimestamp = (timestamp: Date): string => {
    return timestamp.toLocaleString();
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        margin: "8px 0",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            marginRight: "8px",
          }}
        >
          {comment.user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: "bold" }}>{comment.user.name}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {formatTimestamp(comment.timestamp)}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>{comment.content}</div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={handleUpvoteClick}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            👍 {comment.upvotes}
          </button>

          <button
            onClick={handleDownvoteClick}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            👎 {comment.downvotes}
          </button>

          <span style={{ fontWeight: "bold", color: "#666" }}>
            Net: {getNetVotes(comment)}
          </span>
        </div>

        <button
          style={{
            backgroundColor: "transparent",
            color: "#666",
            border: "none",
            cursor: "pointer",
          }}
        >
          Reply
        </button>

        <button
          style={{
            backgroundColor: "transparent",
            color: "#666",
            border: "none",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};
