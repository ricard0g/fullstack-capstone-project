import { useState } from "react";
import './RegisterPage.css';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    console.log("Handling Registration correctly!");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="register-card p-4 border rounded">
            <h2 className="text-center mb-4 font-weight-bold">Register</h2>
            <div className="mb-4">
              <label htmlFor="firstName" className="form label">
                First Name
              </label>
              <br />
              <input
                type="text"
                id="firstName"
                className="form-control"
                placeholder="Enter your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="form label">
                Last Name
              </label>
              <br />
              <input
                type="text"
                id="lastName"
                className="form-control"
                placeholder="Enter your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form label">
                Email
              </label>
              <br />
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form label">
                Password
              </label>
              <br />
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Create Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>
            <p className="mt-4 text-center">
              Already a member?{" "}
              <a href="/app/login" className="text-primary">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
