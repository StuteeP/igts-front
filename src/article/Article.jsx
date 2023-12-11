import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../config";
import { Context } from "../context/Context";
import ArticleContent from "./articleContent/ArticleContent";
import Discussions from "./comment-section/discussions/Discussions";
import Moment from "react-moment";
import MetaDecorators from "../MetaDecorator";

const Article = () => {
  const [heading, setHeading] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [subtopics, setSubtopics] = useState([]);
  const [blog, setBlog] = useState();
  const user = useContext(Context);
  const blog_id = useParams().id;
  const navigate = useNavigate();
  const fetchBlog = async () => {
    const token = localStorage.getItem("jwt");

    const response = await fetch(`${SERVER_URL}/api/blog/${blog_id}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setHeading(data.blog.title);
        setThumbnail(data.blog.thumbnail);
        setContent(data.blog.content);
        setBlog(data.blog);
        setLiked(data.liked);
        setSubtopics(data.blog.subtopics);
      } else {
        console.log("blogs not found");
        navigate("/404");
      }
    }
  };
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    fetchBlog();
  }, [user]);
  const fetchBlogs = async () => {
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${SERVER_URL}/api/user/getreadinglist`, {
      
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (response.status === 200) {
      const data2 = await response.json();
      console.log(data2)
      if (data2.success) {
        
        console.log(data2.readingLists)
        setData(data2.readingLists);
        return data2.readingLists
      }
    }
    else{
      console.log("error")
      console.log(response.json().error)
    }
    
  };
  const [toread, setRead] = useState(false);
  useEffect(() => {
    
    const checkIfInList = async () => {
      const readingList = await fetchBlogs();
      console.log(data)
      const isInList = readingList.some((el) => el._id === blog_id);
      console.log(isInList)
      setRead(isInList);
      
    };
  
    checkIfInList();
  }, [user, blog_id]); 

  const [editor, setEditor] = useState();

  const fetchEditor = async () => {
    const response = await fetch(
      `${SERVER_URL}/api/editor/${blog.editor_user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        setEditor(data);
        console.log("editor ", data);
      }
    }
  };

  useEffect(() => {
    if (blog) fetchEditor();
  }, [blog]);
  const allSpacesRemoved = heading.replaceAll(" ", "-");
  const sliceHeading = heading.slice(0, 62);
  // alert("https://igtsnsut.org/blogs/" + blog_id + "/" + allSpacesRemoved);
  return (
    <div className="sm:pt-48 md:pt-48 lg:pt-24 min-h-screen">
      {/* article place the share button in it */}
      <MetaDecorators
        title={heading}
        description="Welcome to the official website of the IGTS college society! We are a community of passionate individuals with a shared love for gaming, economics, and math."
        image={thumbnail}
      />
      <div className="mx-[8vw] lg:mx-[16vw] flex flex-row items-center justify-start">
        <div className="flex w-max items-center">
          <img
            src={
              editor
                ? editor.pfp_url
                : "https://media.gettyimages.com/id/1389019209/vector/ghost-doodle-5.jpg?s=612x612&w=gi&k=20&c=rIEN506sx3wa05ezS4BEGmbXwrU1gQJYSDv_NdjeEjg="
            }
            alt=""
            className="mr-4 mt-8 aspect-square h-20 rounded-full bg-gray-50 lg:h-16"
          />
        </div>
        <div className="ml-5 flex flex-col gap-1 font-sans text-2xl font-bold lg:text-sm">
          <p className="mt-8 font-sans text-3xl font-bold text-gray-400 lg:text-xl">
            <a>
              <span className="relative inset-0" />
              {editor
                ? editor.name.first_name == undefined
                  ? editor.name.last_name
                  : editor.name.first_name + " " + editor.name.last_name
                : "Deleted User"}
            </a>
          </p>
          <time
            dateTime={blog ? blog.createdAt : ""}
            className="font-light text-3xl lg:text-xl text-gray-400"
          >
            <Moment fromNow>{blog ? blog.createdAt : ""}</Moment>
          </time>
        </div>
      </div>

      <ArticleContent
        content={content}
        heading={heading}
        thumbnail={thumbnail}
        liked={liked}
        toread = {toread}
        setRead = {setRead}
        likes={blog ? blog.likes : 0}
        fetchBlog={fetchBlog}
      />

      <div className="mx-20 flex justify-center items-center sm:mx-30 ">
        <div className="text-stone-300">Related:</div>
        {subtopics.map((el) => {
          const subtopicName = el.name.replaceAll(" ", "-");
          return (
            <a
              href={"/blogs/subtopic/" + el.subtopic_id + "/" + subtopicName}
              className="mx-4 relative z-10 rounded-full bg-stone-600 px-3 py-1.5 text-lg font-medium text-gray-200 hover:bg-gray-100 hover:text-gray-700 lg:text-sm"
            >
              {el.name}
            </a>
          );
        })}
      </div>

      {/* comments */}
      <Discussions />
    </div>
  );
};

export default Article;
