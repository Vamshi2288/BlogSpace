import { useAtom } from "jotai";
import { singleBlog } from "../atoms/singleblog";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/fullblog";
import { BACKEND_URL } from "../config/config";
export const Blog = () => {
  const [blog, setBlog] = useAtom(singleBlog);
  const params = useParams();

  useEffect(() => {
    async function fetchsingleblog() {
      setBlog(null);
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/blog/${params.id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setBlog(response.data);
    }
    fetchsingleblog();
  }, [params.id]);
  return (
    <>
      {blog === null ? (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black ">
          {" "}
          <Loader />
        </div>
      ) : (
        <div className="bg-white min-h-screen w-full flex flex-col items-center">
          <div className="w-full fixed mb-20 pb-0 top-0 left-0  align-middle bg-black shadow-md">
            <Appbar name={blog.author.name} />
          </div>

          <div className="pt-[60px] w-full flex flex-col items-center">
            <FullBlog
              title={blog.title}
              authorname={blog.author.name}
              content={blog.content}
              published={blog.published.split("T")[0]}
              id={blog.id}
            />
          </div>
        </div>
      )}
    </>
  );
};
