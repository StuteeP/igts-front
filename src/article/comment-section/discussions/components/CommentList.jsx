import React, { useState } from "react";
import Comment from "./Comment";
import ReplyForm from "./ReplyForm";
// import "./index.css";
import image from "./logo192.png";




const CommentList = ({ comments }) => {
  const [replies, setReplies] = useState([
    { parentIndex: 0, author: "Alice", message: "Thank you for your comment!" },
  ]);

  

  // const handleReplySubmit = (reply) => {
  //   setReplies([...replies, reply]);
  // };

  const handleDelete = (index) => {
    const newComments = [...comments];
    newComments.splice(index, 1);
    // setComment(newComments);
  };

  const handleReplyDelete = (index) => {
    const newReplies = [...replies];
    newReplies.splice(index, 1);
    setReplies(newReplies);
  };

  const handleReplySubmit = (parentId) => {
    const newReplies = [...replies];
    newReplies.push({ parentId, author: "", message: "" });
    setReplies(newReplies);
  };
  
  // const onReply = (parentId) => {
  //   // If parentId is undefined or null, it's a top-level comment
  //   if (parentId === undefined || parentId === null) {
  //     setReplies([{ parentId: null, author: "", message: "" }]);
  //   } else {
  //     handleReplyClick(parentId);
  //   }
  // };
  
  
  return (
    <div className="comment-list">
      {comments.map((comment, index) => (
        <div key={index} className="comment-container">
          <Comment
            author={comment.author}
            message={comment.message}
            image={image}
            score = {comment.score}
            onDelete={() => handleDelete(index)}
            onReply={() =>
              setReplies([{ parentId: index, author: "", message: "" }])
            }
            commentId={`comment-${index}`}
            replyButtonId={`reply-${index}`}
            deleteButtonId={`delete-${index}`}
          />
          {replies
            .filter((reply) => reply.parentId === index)
            .map((reply, replyIndex) => (
              <div key={replyIndex} className="reply-container">
                <Comment
                  author={reply.author}
                  message={reply.message}
                  onDelete={() => handleReplyDelete(replyIndex)}
                  commentId={`comment-reply-${replyIndex}`}
                  deleteButtonId={`delete-reply-${replyIndex}`}
                  isReply = {true}
                />
              </div>
            ))}
          {replies
            .filter((reply) => reply.parentId === index)
            .map((reply, replyIndex) => (
              <div key={replyIndex} className="reply-form-container">
                <ReplyForm
                  parentId={index}
                  onSubmit={(newReply) => handleReplySubmit(newReply)}
                  formId={`reply-form-${replyIndex}`}
                  textAreaId={`reply-textarea-${replyIndex}`}
                  submitButtonId={`reply-submit-${replyIndex}`}
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
