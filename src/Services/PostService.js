import axios from "axios";

export async function getAllPostsApi() {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts?sort=-createdAt",
      {
        headers: {
          token: localStorage.getItem("token"),
        }
      }
    );
    return data;
  } catch (err) {
    return err;
  }
}
export async function getSinglePostApi(id) {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts/" + id,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (err) {
    return err;
  }
}
export async function createPostApi(formData) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/posts",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (err) {
    return err;
  }
}
