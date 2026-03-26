import React, { useState } from "react";
import { postData } from "../api/PostApi";

const Form = ({ data, setData }) => {
    
    const [addData, setAddData] = useState({
        title: "",
        body:"",
    });

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev) => {
            // console.log(prev)
            return {
                ...prev, [name]:value,
            }  
        })
    }

    // function to post/send data to api
    const addPostData = async () => {
        const res = await postData(addData); //api call to post data in api
        console.log("res", res);

        if (res.status === 201) {
            setData([...data, res.data]);
            setAddData({ title: "", body: "" });
        } 
    }
    
    // form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        addPostData(); 
    }

  return (
    <div className="flex justify-center px-3 py-6">
      <form onSubmit={handleFormSubmit} className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-4 shadow-md">
        {/* Heading */}
        <h2 className="text-lg font-semibold text-white text-center">
          Add Post
        </h2>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-gray-400 text-xs">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            value={addData.title}
            onChange={handleInputChange}
            className="bg-gray-800 text-white px-3 py-1.5 text-sm rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-1">
          <label htmlFor="body" className="text-gray-400 text-xs">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            rows="3"
            placeholder="Write post..."
            value={addData.body}
            onChange={handleInputChange}
            className="bg-gray-800 text-white px-3 py-1.5 text-sm rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-1.5 text-sm rounded-md hover:bg-indigo-600 transition"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
