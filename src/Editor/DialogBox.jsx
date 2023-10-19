import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../config";

const DialogBox = ({ handleSubmit, subtopics, setSubtopics }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);

const handleSearch = async (query) => {
  try {
    const encodedQuery = encodeURIComponent(query); // encode the query parameter
    const response = await fetch(
      `${SERVER_URL}/api/subtopic?search=${encodedQuery}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        console.log(data);
        setRecommendations(data.subtopicList);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

  const handleAddSubtopic = async () => {
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${SERVER_URL}/api/subtopic/add`, {
      method: "POST",
      headers: {
        Authorization: token, // include JWT in the request header
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subtopic_name: searchTerm,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        setSubtopics([
          ...subtopics,
          { subtopic_id: data._doc._id, name: data._doc.name },
        ]);
        setRecommendations([]);
        setSearchTerm("");
      }
    }
  };

  useEffect(() => {
    console.log("subtopics", subtopics);
  }, [subtopics]);


  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center h-full w-full z-50">
      <div
        className="bg-stone-700 rounded-xl lg:py-4 sm:py-10 md:py-10 px-10 card-shadow-black"
        style={{ width: "800px" }}
      >
        <div className="text-gray-200 lg:text-xl sm:text-3xl md:text-3xl font-medium mb-8 ">
          Select subtopics relevant to the blog. (upto 5)
        </div>

        <div className="bg-gray-300 rounded-xl min-h-8 w-full mb-10 flex items-center p-2">
          {subtopics.map((el, i) => {
            return (
              <div className="bg-stone-700 text-gray-300 px-2 py-1 flex justify-between gap-x-1 items-center text-base mr-1 w-max">
                <p className="w-max">{el.name}</p>
                <i
                  className="fa fa-times"
                  onClick={(e) => {
                    setRecommendations([]);
                    setSubtopics(subtopics.filter((el, ind) => ind != i));
                  }}
                ></i>
              </div>
            );
          })}

          {subtopics.length < 5 ? (
            <>
              <input
                type="text"
                className="h-full w-full outline-none bg-transparent"

                onChange={(e) => {
                  setSearchTerm(capitalizeWords(e.target.value));
                  handleSearch(e.target.value);
                }}
                value={searchTerm}
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="absolute right-[50%] -mt-8 w-32 rounded-lg overflow-hidden max-h-[80px] overflow-scroll">
          {recommendations.map((el, i) => {
            return (
              <div
                className="bg-gray-300 border-t-2 border-gray-400 text-gray-800 text-center hover:bg-gray-400 cursor-pointer min-w-full"
                onClick={(e) => {
                  console.log("hh");
                  setSearchTerm("");
                  setRecommendations([]);
                  console.log(el);
                  setSubtopics([
                    ...subtopics,
                    { name: el.name, subtopic_id: el._id },
                  ]);
                }}
              >
                {el.name}
              </div>
            );
          })}
          {searchTerm &&
          searchTerm.length > 0? (
            <>
              <button
                className="bg-gray-300 border-t-2 border-gray-400 text-center flex justify-center min-h-full hover:bg-gray-800 hover:text-gray-200 min-w-full"
                onClick={handleAddSubtopic}
              >
                Add New
              </button>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="flex justify-end lg:space-x-4 sm:space-x-12 md:space-x-12">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg lg:px-4 lg:py-2 sm:p-4 md:p-4 lg:text-base sm:text-3xl md:text-3xl"
            onClick={() => handleSubmit(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white rounded-lg lg:px-4 lg:py-2 sm:p-4 md:p-4 lg:text-base sm:text-3xl md:text-3xl"
            onClick={() => handleSubmit(true)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
