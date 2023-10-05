import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "./config/utils";

const BookDetail = () => {
  const { bookid } = useParams();
  const [bookdata, bookdatachange] = useState({});

  useEffect(() => {
    fetch(baseUrl + bookid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        bookdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

      <div className="container">
        <div className="card row" style={{ textAlign: "left" }}>
          <div className="card-title">
            <h2>Employee Create</h2>
          </div>
          <div className="card-body"></div>

          {bookdata && (
            <div>
              <h2>
                The Employee name is : <b>{bookdata.name}</b> ({bookdata.id})
              </h2>
              <h3>Contact Details</h3>
              <h5>Email is : {bookdata.email}</h5>
              <h5>Phone is : {bookdata.phone}</h5>
              <Link className="btn btn-danger" to="/">
                Back to Listing
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* </div>
            </div> */}
    </div>
  );
};

export default BookDetail;
