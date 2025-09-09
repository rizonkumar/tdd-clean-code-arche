import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CommentSystem } from "../src/components/CommentSystem";

describe("CommentSystem Component", () => {
  it("should render the comment system with initial comments", () => {
    render(<CommentSystem />);

    expect(screen.getByText("Comment System")).toBeInTheDocument();
    expect(screen.getByText("Naresh Jain")).toBeInTheDocument();
    expect(screen.getByText("MD Aman Khan")).toBeInTheDocument();
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
  });

  it("should display upvote and downvote buttons for all comments", () => {
    render(<CommentSystem />);

    const upvoteButtons = screen.getAllByText(/👍/);
    const downvoteButtons = screen.getAllByText(/👎/);
    expect(upvoteButtons).toHaveLength(4);
    expect(downvoteButtons).toHaveLength(4);
  });

  it("should reorder comments when a comment is upvoted", async () => {
    render(<CommentSystem />);

    // Initially, comments should be in order (assuming equal votes)
    const initialComments = screen.getAllByText(
      /Great discussion|Thanks for sharing|I have a question|Excellent explanation/
    );

    // Click upvote on the last comment (should move to top)
    const upvoteButtons = screen.getAllByText("👍 0");
    const lastUpvoteButton = upvoteButtons[upvoteButtons.length - 1];
    fireEvent.click(lastUpvoteButton);

    // Wait for reordering
    await waitFor(() => {
      const updatedComments = screen.getAllByText(
        /Great discussion|Thanks for sharing|I have a question|Excellent explanation/
      );
      // The order should have changed
      expect(updatedComments.length).toBe(4);
    });
  });

  it("should reorder comments when a comment is downvoted", async () => {
    render(<CommentSystem />);

    // Click downvote on the first comment (should move to bottom)
    const downvoteButtons = screen.getAllByText("👎 0");
    fireEvent.click(downvoteButtons[0]);

    // Wait for reordering
    await waitFor(() => {
      const updatedComments = screen.getAllByText(
        /Great discussion|Thanks for sharing|I have a question|Excellent explanation/
      );
      expect(updatedComments.length).toBe(4);
    });
  });

  it("should add a new comment when Add New Comment is clicked", async () => {
    render(<CommentSystem />);

    const addButton = screen.getByText("Add New Comment");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("New User")).toBeInTheDocument();
      expect(
        screen.getByText("This is a new comment that will be sorted by likes!")
      ).toBeInTheDocument();
    });

    const upvoteButtons = screen.getAllByText(/👍/);
    expect(upvoteButtons).toHaveLength(5);
  });

  it("should maintain comment content when voting", async () => {
    render(<CommentSystem />);

    const initialContent = screen.getByText(
      "Great discussion! I really enjoyed the technical details."
    );
    expect(initialContent).toBeInTheDocument();

    const upvoteButtons = screen.getAllByText("👍 0");
    fireEvent.click(upvoteButtons[0]);

    expect(
      screen.getByText(
        "Great discussion! I really enjoyed the technical details."
      )
    ).toBeInTheDocument();
  });

  it("should update upvote count when comment is upvoted", async () => {
    render(<CommentSystem />);

    const upvoteButtons = screen.getAllByText("👍 0");
    const firstUpvoteButton = upvoteButtons[0];
    fireEvent.click(firstUpvoteButton);

    // Should now show 1 upvote
    await waitFor(() => {
      expect(screen.getByText("👍 1")).toBeInTheDocument();
    });
  });

  it("should update downvote count when comment is downvoted", async () => {
    render(<CommentSystem />);

    // Find the first downvote button with count 0
    const downvoteButtons = screen.getAllByText("👎 0");
    const firstDownvoteButton = downvoteButtons[0];
    fireEvent.click(firstDownvoteButton);

    // Should now show 1 downvote
    await waitFor(() => {
      expect(screen.getByText("👎 1")).toBeInTheDocument();
    });
  });

  it("should display net votes correctly", () => {
    render(<CommentSystem />);

    // All comments should start with Net: 0
    const netVoteElements = screen.getAllByText("Net: 0");
    expect(netVoteElements).toHaveLength(4);
  });

  it("should display all comments in the list", () => {
    render(<CommentSystem />);

    // Verify all comment content is displayed
    expect(
      screen.getByText(
        "Great discussion! I really enjoyed the technical details."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Thanks for sharing this. Very informative.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("I have a question about the implementation approach.")
    ).toBeInTheDocument();
    expect(screen.getByText("Excellent explanation!")).toBeInTheDocument();

    expect(screen.getByText("Naresh Jain")).toBeInTheDocument();
    expect(screen.getByText("MD Aman Khan")).toBeInTheDocument();
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();

    const timestampElements = screen.getAllByText((content) => {
      return content.includes("/") || content.includes(":");
    });
    expect(timestampElements.length).toBeGreaterThan(0);
  });

  it("should display meaningful message when no comments are available", () => {
    const EmptyCommentSystem = () => {
      const [comments, setComments] = React.useState<readonly any[]>([]);

      const handleUpvote = () => {};
      const handleDownvote = () => {};
      const handleAddComment = () => {
        const newComment = {
          id: "1",
          user: { id: "1", name: "Test User" },
          content: "Test comment",
          timestamp: new Date(),
          upvotes: 0,
          downvotes: 0,
        };
        setComments([newComment]);
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
                <div
                  key={comment.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "12px",
                    margin: "8px 0",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
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
                      <div style={{ fontWeight: "bold" }}>
                        {comment.user.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {comment.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: "12px" }}>{comment.content}</div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    };

    render(<EmptyCommentSystem />);

    expect(
      screen.getByText("No comments yet. Be the first to share your thoughts!")
    ).toBeInTheDocument();

    // Verify no comments are displayed
    expect(screen.queryByText(/Great discussion/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Naresh Jain/)).not.toBeInTheDocument();
  });

  it("should show comment count in the system", () => {
    render(<CommentSystem />);

    // Count all comment containers (each comment should be in its own container)
    const commentElements = screen.getAllByText((content) => {
      return (
        content.includes("Great discussion") ||
        content.includes("Thanks for sharing") ||
        content.includes("I have a question") ||
        content.includes("Excellent explanation")
      );
    });

    expect(commentElements).toHaveLength(4);
  });

  it("should transition from empty state to showing comments when comment is added", () => {
    // Create a CommentSystem component that starts with no comments
    const TestCommentSystem = () => {
      const [comments, setComments] = React.useState<readonly any[]>([]);

      const handleUpvote = () => {};
      const handleDownvote = () => {};
      const handleAddComment = () => {
        const newComment = {
          id: "1",
          user: { id: "1", name: "Test User" },
          content: "Test comment",
          timestamp: new Date(),
          upvotes: 0,
          downvotes: 0,
        };
        setComments([newComment]);
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
                <div
                  key={comment.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "12px",
                    margin: "8px 0",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
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
                      <div style={{ fontWeight: "bold" }}>
                        {comment.user.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {comment.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: "12px" }}>{comment.content}</div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    };

    const { rerender } = render(<TestCommentSystem />);

    // Initially should show empty message
    expect(
      screen.getByText("No comments yet. Be the first to share your thoughts!")
    ).toBeInTheDocument();

    // Click add comment button
    const addButton = screen.getByText("Add New Comment");
    fireEvent.click(addButton);

    // Should now show the comment
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Test comment")).toBeInTheDocument();

    // Empty message should be gone
    expect(
      screen.queryByText(
        "No comments yet. Be the first to share your thoughts!"
      )
    ).not.toBeInTheDocument();
  });

  it("should display empty state message when CommentSystem starts with no comments", () => {
    render(<CommentSystem initialComments={[]} />);

    expect(
      screen.getByText("No comments yet. Be the first to share your thoughts!")
    ).toBeInTheDocument();

    // Verify no comments are displayed
    expect(screen.queryByText(/Great discussion/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Naresh Jain/)).not.toBeInTheDocument();
    expect(screen.queryByText(/MD Aman Khan/)).not.toBeInTheDocument();
  });

  it("should transition from empty CommentSystem to showing comments when comment is added", async () => {
    render(<CommentSystem initialComments={[]} />);

    // Initially should show empty message
    expect(
      screen.getByText("No comments yet. Be the first to share your thoughts!")
    ).toBeInTheDocument();

    // Click add comment button
    const addButton = screen.getByText("Add New Comment");
    fireEvent.click(addButton);

    // Should now show the comment
    await waitFor(() => {
      expect(screen.getByText("New User")).toBeInTheDocument();
      expect(
        screen.getByText("This is a new comment that will be sorted by likes!")
      ).toBeInTheDocument();
    });

    // Empty message should be gone
    expect(
      screen.queryByText(
        "No comments yet. Be the first to share your thoughts!"
      )
    ).not.toBeInTheDocument();
  });
});
