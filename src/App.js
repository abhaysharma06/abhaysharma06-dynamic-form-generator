// * context

//! components
import MainForms from "./pages/Forms/MainForms";
import Nav from "./components/Navbar/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <Nav />
      <MainForms />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          fontFamily: "Work Sans",
          fontSize: "1.3rem",
          zIndex: 9999,
        }}
      />
    </div>
  );
}

export default App;
