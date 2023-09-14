import { useEffect, useState } from "react";
import { IComment } from "../interfaces";
import { Comment } from "./comment";
import { CommentForm } from "./commentForm";
import { fetchComments } from "../api/fetchComments";
import useUserProfile from "../../../hooks/useUserProfile";

export const Comments = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

  const userprofile = useUserProfile();

  const rootComments = comments.filter((comment) => comment.parentId === null);
  const getReplies = (commentId: string) =>
    comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const handleShowCommentForm = () => setShowCommentForm((pre) => !pre);
  const addComment = (script: string, parentId: string | null = null) => {
    if (userprofile) {
      const comment = {
        ...userprofile,
        id: Math.floor(Math.random()).toString(2),
        comment: script,
        parentId: parentId,
        createdAt: new Date().toISOString(),
        likes: "0",
      };
      setComments([...comments, comment]);
      handleShowCommentForm();
    }
  };
  const deleteComment = (commentId: string) => {
    const filteredComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(filteredComments);
  };

  const getComments = async () => {
    const response = await fetchComments();
    setComments(response);
  };
  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="main">
      <div className="w-50">
        <h4 className="fw-bold">Comments</h4>
        {rootComments.map((comment) => (
          <Comment
            {...comment}
            key={comment.id}
            replies={getReplies(comment.id)}
            deleteComment={deleteComment}
            currentUserId={userprofile?.userId || ""}
            handleSubmit={addComment}
            showCommentForm={showCommentForm}
            handleShowCommentForm={handleShowCommentForm}
          />
        ))}
        <CommentForm handleSubmit={addComment} />
      </div>
    </div>
  );
};
