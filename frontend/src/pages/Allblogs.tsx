import { useAtom } from "jotai";
import { Blogscard } from "../components/Blogscard";
import { useEffect } from "react";
import axios from "axios";
import blogstore from "../atoms/blogs";
import Loader from "../components/loader";
import { BACKEND_URL } from "../config/config";

export default function Blogs() {
  const [blogs, setBlogs] = useAtom(blogstore);
  useEffect(() => {
    console.log("Inside effect");

    async function fetchblogs() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setBlogs(response.data.blogs);
    }
    fetchblogs();
  }, []);

  return (
    <>
      {blogs.length == 0 ? (
        <Loader />
      ) : (
        blogs.map((blog) => (
          <Blogscard
            type="Allblogs"
            id={blog.id}
            title={blog.title}
            content={blog.content}
            authorname={blog.author.name}
            published={blog.published?.split("T")[0]}
          />
        ))
      )}
    </>
  );
}
