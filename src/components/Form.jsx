import React, { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";
import { toast } from "react-toastify";

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  // Form validation state
  const [formError, setFormError] = useState("");


  // updateDataApi is empty initially, if user clicks on edit then that particular data ie curEle gets added to it
  let isEmpty = Object.keys(updateDataApi).length === 0;

  // get the data that needs to be edited and adds into input field
  useEffect(() => {
    // if there is data that needs to be edited(in updateDataApi) then call setAddData which is initially empty and add/set the data into 'addData'(that needs to be edited) on to the input field
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);



  const handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData(prev => {
      // console.log(prev)
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Function to Post/send data to api
  const addPostData = async () => {
    try {
      const res = await postData(addData); //api call to post data in api
      console.log("res", res);

      // if res is succesfull
      if (res.status === 201) {
        setData([...data, res.data]); //set and send/post the data
        setAddData({ title: "", body: "" }); //empty's input filed

        toast.success("Post added successfully ");
      }
    } catch (error) {
      toast.error("Failed to add post ");
    }
  };


  // Function to UPDATE post data
  const updatePostData = async () => {
    try {
      // pass which id needs to be edited(1st arg) and what data to be edited/updated(2nd arg) ie we get it from updateDataApi
      const res = await updateData(updateDataApi.id, addData); //api call to update data
      console.log(res); //(100) [{…}, {…}, {…}..]

      if (res.status === 200) {// to update in UI
        setData(prev => {
          //console.log(prev); //original old data-> (100) [{…}, {…}..]
          return prev.map(curEle => {
            // if elements id is equal to id of response data's id(i.e edit post id) then update only that post(i.e. update it with-> res.data), else keep curr elements as it is
            return curEle.id === updateDataApi.id ? res.data : curEle;
          });
        });

        setAddData({ title: "", body: "" }); //empty's input filed
        setUpdateDataApi({}); //make this empty(edit filed empty)(isEmpty==0(true) button chnges back to "Add")

        toast.success("Post updated successfully"); 
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Failed to update post ❌");
    }

  }


  // Form submission
  const handleFormSubmit = e => {
    e.preventDefault();

    // validation
     if (!addData.title || !addData.body) {
       setFormError("All fields are required");
       return;
     } else {
       setFormError("");
     }

    // this action gets the current value of submit button
    const action = e.nativeEvent.submitter.value;

    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <div className="flex justify-center px-3 py-4">
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-4 shadow-md mb-2"
      >
        {/* Heading */}
        <h2 className="text-lg font-semibold text-white text-center">
          { isEmpty ? "Add Post" : "Edit Post"}
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

        {/* Error Message - Validation */}
        {formError && (
          <p className="text-red-500 text-xs text-center">{formError}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-1.5 text-sm rounded-md hover:bg-indigo-600 transition"
          value={isEmpty ? "Add" : "Edit"}
        >
          {isEmpty ? "Add" : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
