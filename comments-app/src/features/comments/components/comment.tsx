import { IComment } from "../interfaces";
import { CommentForm } from "./commentForm";

interface CommentProps extends IComment {
  replies?: IComment[];
  currentUserId: string;
  deleteComment: (commentId: string) => void;
  handleSubmit: (script: string) => void;
  showCommentForm: boolean;
  handleShowCommentForm: () => void;
}

export const Comment = ({
  id,
  username,
  comment,
  profileImg,
  likes,
  userId,
  currentUserId,
  replies = [],
  deleteComment,
  handleSubmit,
  showCommentForm,
  handleShowCommentForm,
}: CommentProps) => {
  return (
    <>
      <div className="white-bg p-2 my-3">
        <div key={id} className="d-flex ">
          <img src={profileImg} alt={username} height={40} />
          <div className="ms-2">
            <h5>{username}</h5>
            <p>{comment}</p>
            <div className="d-flex">
              <p className="me-1">{likes}</p>
              <img
                src={Number(likes) ? "/assets/like.svg" : "/assets/unlike.svg"}
              />
              {currentUserId === userId ? (
                <button onClick={() => deleteComment(id)} className="red-color">
                  Remove
                </button>
              ) : (
                <button
                  onClick={() => handleShowCommentForm()}
                  className="blue-color"
                >
                  Reply
                </button>
              )}
            </div>
            {showCommentForm && (
              <CommentForm handleSubmit={handleSubmit} id={id} />
            )}
          </div>
        </div>
        <div>
          {!!replies.length &&
            replies.map((reply) => (
              <Comment
                {...reply}
                key={reply.id}
                deleteComment={deleteComment}
                currentUserId={currentUserId}
                handleSubmit={handleSubmit}
                showCommentForm={showCommentForm}
                handleShowCommentForm={handleShowCommentForm}
              />
            ))}
        </div>
      </div>
    </>
  );
};
