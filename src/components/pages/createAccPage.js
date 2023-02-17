import { Link, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../spinner";
import { createUser } from "../../redux/actions/actions";
import validationRules from "../../services/helpers/validationRules";

import classes from "./pages.module.scss";

function CreateAccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    setError,
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const { isAuthorized, isUserProcessing } = useSelector((state) => state.user);
  if (isAuthorized) {
    return <Navigate to="/profile" />;
  }

  async function onSubmit(data) {
    try {
      await dispatch(createUser(data));
      reset();
      navigate("/sign-in");
    } catch (err) {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const input in err) {
        setError(input, { message: "Is already taken" });
      }
    }
  }

  const submitButton = isUserProcessing ? (
    <Spinner size={10} />
  ) : (
    <input type="submit" value="Create" className={classes.submit} disabled={!isValid} />
  );

  return (
    <section className={classes.accountForm}>
      <h3 className={classes.header}>Create new account</h3>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className={classes.inputName}>Username</span>
          <input
            className={classes.input}
            type="text"
            placeholder="Username"
            style={errors?.username && { outline: "1px solid red" }}
            {...register("username", validationRules.username)}
          />
          {errors?.username && <span className={classes.errorMessage}>{errors?.username?.message}</span>}
        </label>

        <label>
          <span className={classes.inputName}>Email address</span>
          <input
            className={classes.input}
            type="email"
            style={({ textTransform: "lowercase" }, errors?.email && { outline: "1px solid red" })}
            placeholder="Email address"
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
            {...register("password", validationRules.password)}
          />
          {errors?.password && <span className={classes.errorMessage}>{errors?.password?.message}</span>}
        </label>
        <label>
          <span className={classes.inputName}>Repeat Password</span>
          <input
            type="password"
            className={classes.input}
            placeholder="Password"
            style={errors?.passwordConfirmation && { outline: "1px solid red" }}
            {...register("passwordConfirmation", {
              required: "Please, confirm password",
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords should match";
                },
              },
            })}
          />
          {errors?.passwordConfirmation && (
            <span className={classes.errorMessage}>{errors?.passwordConfirmation?.message}</span>
          )}
        </label>

        <label className={classes.agreement}>
          <input
            type="checkbox"
            {...register("agreement", {
              required: true,
            })}
          />
          <span className={classes.checkbox} />
          <span>I agree to the processing of my personal information</span>
        </label>
        {submitButton}
      </form>

      <span className={classes.span}>
        Already have an account?{" "}
        <Link to="/sign-in" className={classes.link}>
          Sign In.
        </Link>
      </span>
    </section>
  );
}

export default CreateAccountPage;
