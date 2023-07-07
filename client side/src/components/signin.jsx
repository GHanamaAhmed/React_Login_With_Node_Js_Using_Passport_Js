import React, { useContext, useState } from "react";
import { axiosSimple } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    axiosSimple
      .post("/auth/local", { email, password }, { withCredentials: true })
      .then((res) => {
        navigate("/profile");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div
      className="container-md d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form>
        <div className="w-100 text-center">
          <h1>Signin</h1>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="w-full d-flex justify-content-between">
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <Link to="http://localhost:5173/signup">signup</Link>
        </div>
        <div className="d-flex flex-column gap-2">
          <button onClick={submit} className="btn btn-primary">
            Submit
          </button>
          <div
            onClick={() =>
              window.open("http://localhost:4000/auth/google", "_self")
            }
            className="btn btn-primary"
          >
            Google
          </div>
          <div
            onClick={() =>
              window.open("http://localhost:4000/auth/facebook", "_self")
            }
            className="btn btn-primary"
          >
            Facebook
          </div>
        </div>
      </form>
    </div>
  );
}
