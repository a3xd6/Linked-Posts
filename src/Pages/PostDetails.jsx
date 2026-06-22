import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePostApi } from "../Services/PostService";
import PostCard from "../Components/PostCard";
import LoadingScreen from "../Components/LoadingScreen";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  async function getPost() {
    const response = await getSinglePostApi(id);
    if (response.message) {
      setPost(response.post);
    }
  }

  useEffect(() => {
    getPost();
  }, []);
  return (
    <>
      <div className="w-4/6 mx-auto">
        {!post ? <LoadingScreen /> : <PostCard post={post} />}
      </div>
    </>
  );
}
