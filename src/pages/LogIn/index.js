import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWs } from "../../services/auth-ws";

export default function LogIn({ authenticate }) {
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setError(null);
    return setForm({ ...form, [name]: value });
  }

  async function handleFormSubmission(event) {
    event.preventDefault();
    try {
      const credentials = {
        email,
        password,
      };
      const { data, status, errorMessage } = await loginWs(credentials);
      if (status) {
        authenticate(data.user);
        navigate("/feed");
      } else {
        setError(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleFormSubmission} className="signup__form">
        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        {error && (
          <div className="error-block">
            <p>Hubo un problema con tu inicio de sesion:</p>
            <p>{error}</p>
          </div>
        )}

        <button className="button__submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
