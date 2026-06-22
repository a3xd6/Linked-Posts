import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import { getAllPostsApi } from "../Services/PostService";
import LoadingScreen from "../Components/LoadingScreen";
import CreatePost from "../Components/CreatePost";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const response = await getAllPostsApi();
    setPosts(response.posts);
  }

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <div className="w-4/6 mx-auto">
        <CreatePost callBack={getPosts} />
        {posts.length == 0 ? (
          <LoadingScreen />
        ) : (
          posts.map((post) => (
            <PostCard
              post={post}
              commentLimit={1}
              key={post.id}
            />
          ))
        )}
      </div>
    </>
  );
}
