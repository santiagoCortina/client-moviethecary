import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupWs } from "../../services/auth-ws";

export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      email,
      password,
      confirmPassword,
    };
    signupWs(credentials).then((response) => {
      if (response.status) {
        navigate("/feed");
      } else {
        setError(response.errorMessage);
      }
    });
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleFormSubmission} className="auth__form">
        <label htmlFor="input-email">Please enter your email</label>
        <input
          id="input-email"
          type="text"
          name="email"
          placeholder="Text"
          value={email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password">Please enter your password</label>
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

        <label htmlFor="input-confirmPassword">
          Please confirm you password
        </label>
        <input
          id="input-confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="button__submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
