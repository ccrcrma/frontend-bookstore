import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookListing from "./BookListing";
import BookCreate from "./BookCreate";
import BookDetail from "./BookDetail";
import BookEdit from "./BookEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import LoginForm from "./LoginForm";
import AuthService from "./services/AuthService";

function App() {
  return (
    <div className="App">
      <h1>BookStore App</h1>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/login"
            element={<LoginForm authService={AuthService} />}
          />
          <Route path="/" element={<BookListing />} />
          <Route exact path="/book/create" element={<ProtectedRoute />}>
            <Route exact path="/book/create" element={<BookCreate />} />
          </Route>
          <Route path="/book/detail/:bookid" element={<BookDetail />} />
          <Route path="/book/edit/:bookid" element={<BookEdit />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
