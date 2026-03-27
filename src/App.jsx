import { Posts } from "./components/Posts"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <section>
      <Posts />
      {/* <ToastContainer position="bottom-right" /> */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        className="p-3 sm:p-4"
        toastClassName={() =>
          "w-full sm:w-auto max-w-sm bg-slate-800 text-white border border-indigo-500 rounded-xl shadow-xl p-4 flex items-start gap-3 pr-10 mb-3 relative overflow-hidden"
        }
        bodyClassName="text-xs  text-sm font-medium flex-1"
      />
    </section>
  );
}

export default App
