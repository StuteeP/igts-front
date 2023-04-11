import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../config";
import ArticleCard from "../ArticleCard";

const SubtopicArticleList = () => {
  const [pge_no, setPge_no] = useState(0);
  const [posts, setPosts] = useState([
    {
      _id: 1,
      title: "Boost your conversion rate",
      href: "#",
      content: "",
      date: "Mar 16, 2020",
      createdAt: Date.now(),
      subtopics: [{ name: "Marketing", subtopic_id: "#" }],
      editor: {
        name: "Michael Foster",
        pfp_url:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      thumbnail: "sdasafas",
    },
    {
      _id: 1,
      title: "Boost your conversion rate",
      content: "",
      createdAt: Date.now(),
      subtopics: [{ name: "Marketing", subtopic_id: "#" }],
      editor: {
        name: "Michael Foster",
        pfp_url:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      thumbnail: "sdasafas",
    },
    {
      _id: 1,
      title: "Boost your conversion rate",
      content: "",
      createdAt: Date.now(),
      subtopics: [{ name: "Marketing", subtopic_id: "#" }],
      editor: {
        name: "Michael Foster",
        pfp_url:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      thumbnail: "sdasafas",
    },

    // More posts...
  ]);

  const subtopic_id = useParams().id;

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/blog/${subtopic_id}/getblogsbynew/${pge_no}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success) setPosts([...posts, ...data.blogs]);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [pge_no]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // Calculate the distance between the bottom of the page and the current scroll position
      const distanceToBottom =
        document.documentElement.offsetHeight -
        (window.innerHeight + window.scrollY);

      // Check if the user has reached the bottom of the page
      if (distanceToBottom <= 0) {
        setPge_no(pge_no + 1);
      }
    });
  }, []);

  return (
    <div className=" ">
      <div className=" lg:px-24 md:mx-24 sm:mx-5">
        <div className="mx-auto mt-10 grid gap-y-14 w-fit">
          {posts.map((el) => {
            return <ArticleCard post={el} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SubtopicArticleList;
