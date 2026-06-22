import React, { useContext, useState } from "react";
import PostHeader from "./PostStructure/PostHeader";
import PostBody from "./PostStructure/PostBody";
import PostFooter from "./PostStructure/PostFooter";
import Comment from "./Comment";
import { Button, Input } from "@heroui/react";
import {
  createCommentApi,
  getPostCommentsApi,
} from "../Services/CommentService";
import { AuthContext } from "../Context/AuthContext";
import DropdownActions from "./PostStructure/DropdownActions";

export default function PostCard({ post, commentLimit }) {
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(post.comments);

  const { userData } = useContext(AuthContext);

  async function getPostComments() {
    const res = await getPostCommentsApi(post.id);
    setComments(res.comments);
  }

  async function createComment(e) {
    e.preventDefault();
    setLoading(true);
    const response = await createCommentApi(commentContent, post.id);
    if (response.message) {
      setComments(response.comments);
      setCommentContent("");
    }
    setLoading(false);
  }
  return (
    <>
      <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
        <div className="w-full h-16 flex items-center  justify-between ">
          <PostHeader
            photo={post.user.photo}
            name={post.user.name}
            date={post.createdAt}
          />
          {post.user._id === userData._id && <DropdownActions />}
        </div>
        <PostBody body={post.body} image={post.image} />
        <form onSubmit={createComment} className="flex gap-x-2 mt-3">
          <Input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            variant="bordered"
            placeholder="comment..."
          />
          <Button
            isLoading={loading}
            type="submit"
            color="primary"
            disabled={commentContent.length < 2}
          >
            Add Comment
          </Button>
        </form>
        <PostFooter postId={post.id} commentsNumber={comments.length} />
        {comments.length > 0 &&
          comments
            .slice(0, commentLimit)
            .map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                postUserId={post.user._id}
                callBack={getPostComments}
              />
            ))}
      </div>
    </>
  );
}
