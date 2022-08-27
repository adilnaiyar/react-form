import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, SetIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    SetIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = "UserName is Required!";
    }

    if (!values.email) {
      errors.email = "Email is Required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="message">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>UserName</label>
            <div className="form-input">
              <input
                type="text"
                name="username"
                placeholder="Enter UserName"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <span>{formErrors.username}</span>
          <div className="field">
            <label>Email</label>
            <div className="form-input">
              <input
                type="text"
                name="email"
                placeholder="Enter UserName"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <span>{formErrors.email}</span>
          <div className="field">
            <label>Password</label>
            <div className="form-input">
              <input
                type="password"
                name="password"
                placeholder="Enter UserName"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <span>{formErrors.password}</span>
          <div>
            <button className="button">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
