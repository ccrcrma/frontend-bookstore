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
import Navbar from "./Navbar";
import { useState } from "react";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    new AuthService().isAuthenticated()
  );

  const handleLogout = () => {
    // Implement your logout logic here, e.g., clear tokens or session
    new AuthService().logout();
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <LoginForm
                authService={AuthService}
                setAuthenticated={setIsAuthenticated}
              />
            }
          />

          <Route path="/book/list" element={<ProtectedRoute />}>
            <Route path="/book/list" element={<BookListing />} />
          </Route>

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
