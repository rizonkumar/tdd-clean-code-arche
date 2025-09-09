import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Comment } from "../src/components/Comment";
import { createComment, createUser } from "../src/types/Comment";

describe("Comment Component", () => {
  const testUser = createUser("1", "Test User");
  const mockOnUpvote = jest.fn();
  const mockOnDownvote = jest.fn();

  const createTestComment = (upvotes: number = 0, downvotes: number = 0) => ({
    ...createComment("1", testUser, "Test comment content"),
    upvotes,
    downvotes,
  });

  beforeEach(() => {
    mockOnUpvote.mockClear();
    mockOnDownvote.mockClear();
  });

  it("should render comment with user information", () => {
    const comment = createTestComment();
    render(
      <Comment
        comment={comment}
        onUpvote={mockOnUpvote}
        onDownvote={mockOnDownvote}
      />
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Test comment content")).toBeInTheDocument();
  });

  it("should display the correct number of upvotes and downvotes", () => {
    const comment = createTestComment(5, 2);
    render(
      <Comment
        comment={comment}
        onUpvote={mockOnUpvote}
        onDownvote={mockOnDownvote}
      />
    );

    expect(screen.getByText("👍 5")).toBeInTheDocument();
    expect(screen.getByText("👎 2")).toBeInTheDocument();
    expect(screen.getByText("Net: 3")).toBeInTheDocument();
  });

  it("should display user avatar with first letter", () => {
    const comment = createTestComment();
    render(
      <Comment
        comment={comment}
        onUpvote={mockOnUpvote}
        onDownvote={mockOnDownvote}
      />
    );

    expect(screen.getByText("T")).toBeInTheDocument(); // First letter of "Test User"
  });

  it("should call onUpvote when upvote button is clicked", () => {
    const comment = createTestComment();
    render(
      <Comment
        comment={comment}
        onUpvote={mockOnUpvote}
        onDownvote={mockOnDownvote}
      />
    );

    const upvoteButton = screen.getByText("👍 0");
    fireEvent.click(upvoteButton);

    expect(mockOnUpvote).toHaveBeenCalledWith("1");
    expect(mockOnUpvote).toHaveBeenCalledTimes(1);
  });

  it("should call onDownvote when downvote button is clicked", () => {
    const comment = createTestComment();
    render(
      <Comment
        comment={comment}
        onUpvote={mockOnUpvote}
        onDownvote={mockOnDownvote}
      />
    );

    const downvoteButton = screen.getByText("👎 0");
    fireEvent.click(downvoteButton);

    expect(mockOnDownvote).toHaveBeenCalledWith("1");
    expect(mockOnDownvote).toHaveBeenCalledTimes(1);
  });

  it("should display timestamp", () => {
    const comment = createTestComment();
    render(
      <Comment
        comment={comment}
        onUpvote={mockOnUpvote}
        onDownvote={mockOnDownvote}
      />
    );

    const timestampElements = screen.getAllByText((content) => {
      return content.includes("/") || content.includes(":");
    });

    // Should find at least one timestamp element
    expect(timestampElements.length).toBeGreaterThan(0);
  });

  it("should display reply and edit buttons", () => {
    const comment = createTestComment();
    render(
      <Comment
        comment={comment}
        onUpvote={mockOnUpvote}
        onDownvote={mockOnDownvote}
      />
    );

    expect(screen.getByText("Reply")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });
});
