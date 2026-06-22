import React, { useContext, useState } from "react";
import PostHeader from "./PostStructure/PostHeader";
import { AuthContext } from "../Context/AuthContext";
import DropdownActions from "./PostStructure/DropdownActions";
import { Button, Input } from "@heroui/react";
import { updateCommentApi } from "../Services/CommentService";

export default function Comment({ comment, postUserId, callBack }) {
  const { userData } = useContext(AuthContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedValue, setupdatedValue] = useState(comment.content);
  const [loading, setloading] = useState(false);

  async function updateComment(e) {
    e.preventDefault();
    setloading(true);
    const res = await updateCommentApi(comment._id, updatedValue);
    if (res.message) {
      await callBack();
      setloading(false);
      setIsUpdating(false);
    }
  }
  return (
    <>
      <div className="p-4 bg-gray-100 border-b-1 border-divider">
        <div className="w-full h-16 flex items-center  justify-between ">
          <PostHeader
            photo={comment.commentCreator.photo}
            name={comment.commentCreator.name}
            date={comment.createdAt}
          />
          {postUserId === userData._id &&
            comment.commentCreator._id === userData._id && (
              <DropdownActions
                commentId={comment._id}
                callBack={callBack}
                setIsUpdating={setIsUpdating}
              />
            )}
        </div>
        <p className="p-2">{comment.content}</p>
        {isUpdating && (
          <form onSubmit={updateComment} className="flex gap-2">
            <Input
              value={updatedValue}
              onChange={(e) => setupdatedValue(e.target.value)}
              variant="bordered"
            />
            <Button type="submit" color="warning" isLoading={loading}>
              Update
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
