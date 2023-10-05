import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookListing from "./BookListing";
import BookCreate from "./BookCreate";
import BookDetail from "./BookDetail";
import BookEdit from "./BookEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <h1>BookStore App</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookListing />}></Route>
          <Route path="/book/create" element={<BookCreate />}></Route>
          <Route path="/book/detail/:bookid" element={<BookDetail />}></Route>
          <Route path="/book/edit/:bookid" element={<BookEdit />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
