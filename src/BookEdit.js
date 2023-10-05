import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "./config/utils";
import GenreDropDown from "./GenreDropDown";
import { notify } from "./utils/toast";

const BookEdit = () => {
  const { bookid } = useParams();
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [publishedDate, publishedDatechange] = useState("");
  const [genre, genrechange] = useState("");
  const [validation, valchange] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetch(baseUrl + bookid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idchange(resp.id);
        namechange(resp.name);
        genrechange(resp.genre);
        publishedDatechange(resp.publishedDate);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    const bookdata = { id, name, publishedDate, genre };

    fetch(baseUrl + bookid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookdata),
    })
      .then((res) => {
        notify('Edited Successfully');
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Book Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        disabled="disabled"
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {name.length == 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Published Date</label>
                      <input
                        value={publishedDate}
                        onChange={(e) => publishedDatechange(e.target.value)}
                        className="form-control"
                        type="date"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <GenreDropDown handleChange={genrechange} value={genre} />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookEdit;
