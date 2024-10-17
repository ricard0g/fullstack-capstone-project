import { useState } from 'react';
import './LoginPage.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log("Logged In!");
    }

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-card p-4 border rounded">
              <h2 className="text-center mb-4 font-weight-bold">Login</h2>
          <div className="mb-3">
            <label htmlFor="email">Email</label><br/>
            <input type="text" className="form-control" value={email} id="email" placeHolder="Insert your email" onChange={(e) => setEmail(e.target.value)}  />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label><br/>
            <input type="password" value={password} id="password" placeHolder="Insert your password" onChange={(e) => setPassword(e.target.value)}  />
          </div>
          <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Login</button>
                <p className="mt-4 text-center">
                    New here? <a href="/app/register" className="text-primary">Register Here</a>
                </p>
            </div>
          </div>
        </div>
      </div>
    )Ï
}