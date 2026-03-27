import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import Form from "./Form";
import { toast } from "react-toastify";

export const Posts = () => {
  console.log(getPost()); //returns promise

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // for edit/upadting the data
  const [updateDataApi, setUpdateDataApi] = useState({}); //passed object bcz data is passed in object format

  // Fetchs Data
  const getPostData = async () => {
    try {
      setLoading(true); // start loading
      setError(null); // reset error

      const response = await getPost();
      console.log(response); //{data: Array(100), status: 200, ........}
      setData(response.data);
    }
    catch (err) {
      console.error(err);
      setError("Failed to fetch posts"); // set error message
    }
    finally {
      setLoading(false); // stop loading (always runs)
    }
  };

  useEffect(() => {
    getPostData();
  }, []);
 

  // Function to Delete Post
  const handleDeletePost = async id => {

    try {
      const res = await deletePost(id); //api call
      console.log(res);

      //  to update the data on UI after deleting from api
      if (res.status === 200) {
        const newUpdatedPosts = data.filter(curPost => curPost.id !== id);
        setData(newUpdatedPosts);

        toast.success("Post deleted successfully 🗑️");
      }
    } catch (error) {
      toast.error("Failed to delete post ❌");
    }
  };


  // Update post
  const handleUpdatePost = curEle => {
    //when user clicks on any particular post
    setUpdateDataApi(curEle); //then that particular post is set to 'updateData' variable so that it can be passed to form component
  };


  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 lg:p-10">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Blog Posts
      </h1>

      {/* Form component to Add/Update data  */}
      <Form
        data={data}
        setData={setData}
        updateDataApi={updateDataApi}
        setUpdateDataApi={setUpdateDataApi}
      />

      {/* Loading  State */}
      {/* {loading && (
        <p className="text-white text-center mt-4">Loading posts...</p>
      )} */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white"></div>
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Posts List */}
      {!loading && !error && (
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map(curEle => {
              const { id, title, body } = curEle;
              return (
                <li
                  key={id}
                  className="bg-gray-800/70 backdrop-blur-lg border border-gray-700 rounded-2xl p-5 flex flex-col justify-between shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
                >
                  {/* Content */}
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-2">
                      {title}
                    </h2>
                    <p className="text-gray-400 text-sm">{body}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleUpdatePost(curEle)}
                      className="flex-1 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(id)}
                      className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
      )}
    </section>
  );
};


