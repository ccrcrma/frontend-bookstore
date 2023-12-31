import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "./config/utils";
import GenreDropDown from "./GenreDropDown";
import { notify } from "./utils/toast";
import { useForm, Controller } from "react-hook-form";
import AuthService from "./services/AuthService";

const BookCreate = () => {
  const { handleSubmit, control, formState } = useForm({
    defaultValues: {
      name: "",
      publishedDate: "",
      genreId: "",
    },
  });
  const navigate = useNavigate();
  const onSubmit = (bookdata) => {
    bookdata.title = bookdata.name;
    const headers = {
      Authorization: `Bearer ${new AuthService().getToken()}`,
      "Content-Type": "application/json",
    };

    fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(bookdata),
      headers,
    })
      .then((res) => {
        if (res.ok) {
          notify("Created successfully.");
          navigate("/book/list");
        } else {
          notify("Error occured while creating");
        }
      })
      .catch((err) => {
        notify("Error occured while creating");
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit(onSubmit)}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Book Create</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={null}
                        disabled="disabled"
                        className="form-control"
                      ></input>
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
                        class="form-control"
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
                      <GenreDropDown
                        value={null}
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

export default BookCreate;
