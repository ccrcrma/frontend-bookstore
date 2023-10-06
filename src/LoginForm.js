// src/components/LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

function LoginForm({ authService, setAuthenticated }) {
  const { handleSubmit, control, formState } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (loginData) => {
    try {
      console.log(loginData);
      const token = await new authService().login({ ...loginData });
      if (token) {
        // Redirect to a protected route or dashboard
        setAuthenticated(true);
        navigate("/book/list");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <div className="card" style={{ textAlign: "left" }}>
          <div className="card-title">
            <h2>Login</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>UserName</label>
                        <Controller
                          name="username"
                          control={control}
                          rules={{ required: "username is required" }}
                          class="form-control"
                          render={({ field }) => (
                            <div>
                              <input
                                {...field}
                                type="text"
                                id="username"
                                class="form-control"
                              />
                              {formState.errors.username && (
                                <span className="error">
                                  {formState.errors.username.message}
                                </span>
                              )}
                            </div>
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Password</label>
                        <Controller
                          name="password"
                          control={control}
                          rules={{ required: "Password is required" }}
                          class="form-control"
                          render={({ field }) => (
                            <div>
                              <input
                                {...field}
                                type="text"
                                id="password"
                                class="form-control"
                              />
                              {formState.errors.password && (
                                <span className="error">
                                  {formState.errors.password.message}
                                </span>
                              )}
                            </div>
                          )}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
