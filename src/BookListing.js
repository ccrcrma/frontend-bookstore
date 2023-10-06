import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "./config/utils";
import Dropdown from "./utils/Dropdown";
import { notify } from "./utils/toast";
import ReactPaginate from "react-paginate";
import { GetLabelForGenre } from "./constants/const";
import { FILTEROPTIONS } from "./constants/const";
import AuthService from "./services/AuthService";
import { formatDate } from "./utils/formatDate";
import { AuthHeaders } from "./config/utils";

const BookListing = () => {
  const [bookdata, datachange] = useState([]);
  const [filterValue, setFilterValue] = useState(null); // State
  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  // handling page changes
  const handlePageChange = (selectedPage) => {
    console.log(selectedPage);
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const subset = data.slice(startIndex, endIndex);

  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/book/detail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/book/edit/" + id);
  };
  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(baseUrl + "/" + id, {
        method: "DELETE",
        headers: AuthHeaders,
      })
        .then((res) => {
          console.log(res.status);
          if (res.ok) {
            notify("Deleted Successfully");
            navigate("/book/list");
          } else if (res.status == 403) {
            notify("Forbidden: only admin user have deletion previleges ");
          }
        })
        .catch((err) => {
          console.log(err.message);
          notify("error occured");
        });
    }
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${new AuthService().getToken()}`,
    };
    const bookUrl = `${baseUrl}?pageNumber=${currentPage + 1}`;
    if (filterValue !== "") {
      fetch(bookUrl, { method: "GET", headers }) //
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          // resp = resp.data.map((resp) => {
          //   resp.genre = GetLabelForGenre(resp.genre);
          //   return resp;
          // });
          datachange(resp);
          setTotalPages(Math.ceil(resp.totalRecords / resp.pageSize));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [filterValue, currentPage]);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterValue(selectedFilter);
  };
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-title">
            <h2>Book Listing</h2>
          </div>
          <div className="card-body  border">
            <div className="divbtn">
              <Link to="/book/create" className="btn btn-success">
                Add New (+)
              </Link>
            </div>
            <div className="float-right">
              <Dropdown
                options={FILTEROPTIONS}
                selectedValue={filterValue}
                onChange={handleFilterChange}
              />
            </div>
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>publishedDate</td>
                  <td>Genre</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {bookdata.data &&
                  bookdata.data.map((item) => (
                    <tr key={item.bookId}>
                      <td>{item.bookId}</td>
                      <td>{item.title}</td>
                      <td>{formatDate(item.publishedDate)}</td>
                      <td>{item.bookGenre.genreName}</td>

                      <td>
                        <a
                          onClick={() => {
                            LoadEdit(item.bookId);
                          }}
                          className="btn btn-success"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => {
                            Removefunction(item.bookId);
                          }}
                          className="btn btn-danger"
                        >
                          Remove
                        </a>
                        {/* <a
                          onClick={() => {
                            LoadDetail(item.id);
                          }}
                          className="btn btn-primary"
                        >
                          Details
                        </a> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageChange}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </>
  );
};

export default BookListing;
