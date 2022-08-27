import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [userInfo, setUserInfo] = useState();
  const onSubmit = (data) => {
    setUserInfo(data);
  };
  return (
    <div className="container">
      <pre>{JSON.stringify(userInfo, undefined, 2)}</pre>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 4,
                    message: "Username must be at least 3 characters",
                  },
                })}
              />
            </div>
          </div>
          {errors.username && <span>{errors.username.message}</span>}
          <div className="field">
            <label>Email</label>
            <div className="form-input">
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i,
                    message: "This is not a valid email",
                  },
                })}
              />
            </div>
          </div>
          {errors.email && <span>{errors.email.message}</span>}
          <div className="field">
            <label>Password</label>
            <div className="form-input">
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                    message:
                      "Must Contain 6 Characters, One Uppercase, One Lowercase,  One Number and one special case Character",
                  },
                })}
              />
            </div>
          </div>
          {errors.password && <span>{errors.password.message}</span>}
          <div>
            <div className="field">
              <label> Confirm Password</label>
              <div className="form-input">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Your Password"
                  {...register("confirmPassword", {
                    required: "Password Conformation is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Password doesn't match.",
                  })}
                />
              </div>
            </div>
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
            <div></div>
            <button className="button">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
