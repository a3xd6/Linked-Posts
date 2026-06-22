import { Button, Input, Spinner } from "@heroui/react";
import React, { useState } from "react";
import { createPostApi } from "../Services/PostService";

export default function CreatePost({ callBack }) {
  const [postBody, setPostBody] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  function handleImage(e) {
    setImageFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = "";
  }
  async function createPost(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    postBody && formData.append("body", postBody);
    imageFile && formData.append("image", imageFile);
    const response = await createPostApi(formData);
    if (response.message) {
      await callBack();
    }
    setLoading(false);
    setPostBody("");
    setImageFile(null);
    setImageUrl("");
  }

  return (
    <>
      <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 relative">
        <form onSubmit={createPost}>
          <textarea
            placeholder="What's in your mind..."
            className="border w-full resize-none p-4 rounded-md"
            rows={4}
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          ></textarea>
          {imageUrl && (
            <div className="relative">
              <img src={imageUrl} className="w-full" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 absolute top-4 end-4 cursor-pointer text-gray-500 border border-gray-500"
                onClick={() => setImageUrl("")}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
          <div className="flex justify-between items-center">
            <label className="hover:text-blue-500 cursor-pointer flex items-center gap-1">
              <Input type="file" onChange={handleImage} className="hidden" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <span>image</span>
            </label>
            <Button type="submit" color="primary">
              Post
            </Button>
          </div>
        </form>
        {loading && (
          <div className="flex justify-center items-center bg-gray-300/50 absolute inset-0">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
