import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "./config/utils";
import GenreDropDown from "./GenreDropDown";
import { notify } from "./utils/toast";
import { useForm, Controller } from "react-hook-form";

const BookEdit = () => {
  const { bookid } = useParams();
  const { handleSubmit, control, reset, formState } = useForm({
    defaultValues: {
      name: "",
      publishedDate: "",
      genre: "",
      id: null,
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl + bookid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        reset(resp);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const onSubmit = (bookdata) => {
    console.log(bookdata);
    fetch(baseUrl + bookid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookdata),
    })
      .then((res) => {
        notify("Edited Successfully");
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
          <form className="container" onSubmit={handleSubmit(onSubmit)}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Book Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <Controller
                        name="id"
                        control={control}
                        rules={{ required: "Id is required" }}
                        class="form-control"
                        render={({ field }) => (
                          <input
                            disabled="disabled"
                            className="form-control"
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        class="form-control"
                        render={({ field }) => (
                          <div>
                            <input
                              {...field}
                              type="text"
                              id="name"
                              class="form-control"
                            />
                            {formState.errors.name && (
                              <span className="error">
                                {formState.errors.name.message}
                              </span>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Published Date</label>
                      <Controller
                        name="publishedDate"
                        control={control}
                        rules={{ required: "publishedDate is required" }}
                        className="form-control"
                        render={({ field }) => (
                          <div>
                            <input
                              {...field}
                              type="date"
                              id="publishedDate"
                              class="form-control"
                            />
                            {formState.errors.publishedDate && (
                              <span className="error">
                                {formState.errors.publishedDate.message}
                              </span>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Genre</label>
                      <GenreDropDown
                        value={formState?.field?.genre}
                        control={control}
                        formState={formState}
                      />
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
