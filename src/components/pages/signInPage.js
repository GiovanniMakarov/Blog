import { Link, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Spinner from "../spinner";
import { loginUser } from "../../redux/actions/actions";
import validationRules from "../../services/helpers/validationRules";

import classes from "./pages.module.scss";

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthorized, isUserProcessing } = useSelector((state) => state.user);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm({
    mode: "onTouched",
  });

  if (isAuthorized) {
    return <Navigate to="/profile" />;
  }

  const onLogin = async (data) => {
    try {
      await dispatch(loginUser(data));
      navigate("/articles");
    } catch (error) {
      setError("password", { message: "Email or password is invalid" });
    }
  };

  const submitButton = isUserProcessing ? (
    <Spinner size={10} />
  ) : (
    <input type="submit" value="Login" className={classes.submit} disabled={!isValid} />
  );

  return (
    <section className={classes.accountForm}>
      <h3 className={classes.header}>Sign In</h3>
      <form className={classes.form} onSubmit={handleSubmit(onLogin)}>
        <label>
          <span className={classes.inputName}>Email address</span>
          <input
            className={classes.input}
            type="email"
            placeholder="Email address"
            style={errors?.email && { outline: "1px solid red" }}
            {...register("email", validationRules.email)}
          />
          {errors?.email && <span className={classes.errorMessage}>{errors?.email?.message}</span>}
        </label>

        <label>
          <span className={classes.inputName}>Password</span>
          <input
            type="password"
            className={classes.input}
            placeholder="Password"
            style={errors?.password && { outline: "1px solid red" }}
            {...register("password", { required: "Enter password" })}
          />
          {errors?.password && <span className={classes.errorMessage}>{errors?.password?.message}</span>}
        </label>
        {submitButton}
      </form>

      <span className={classes.span}>
        Don’t have an account?{" "}
        <Link to="/sign-up" className={classes.link}>
          Sign Up.
        </Link>
      </span>
    </section>
  );
}

export default SignInPage;
