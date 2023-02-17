import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Spinner from "../spinner";
import { changeUserData } from "../../redux/actions/actions";
import validationRules from "../../services/helpers/validationRules";

import classes from "./pages.module.scss";

function EditAccountPage() {
  const { isAuthorized, isUserProcessing, user } = useSelector((state) => state.user);

  if (!isAuthorized) {
    return <Navigate to="/sign-in" />;
  }

  const dispatch = useDispatch();

  const { username, email, image, token } = user;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm({
    mode: "onTouched",
  });

  const onSaved = async (data) => {
    try {
      await dispatch(changeUserData(data, token));
    } catch (err) {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const input in err) {
        setError(input, { message: "Is already taken" });
      }
    }
  };

  const submitButton = isUserProcessing ? (
    <Spinner size={10} />
  ) : (
    <input type="submit" value="Save" className={classes.submit} disabled={!isValid} />
  );

  return (
    <section className={classes.accountForm}>
      <h3 className={classes.header}>Edit Profile</h3>
      <form className={classes.form} onSubmit={handleSubmit(onSaved)}>
        <label>
          <span className={classes.inputName}>Username</span>
          <input
            className={classes.input}
            type="text"
            placeholder="Username"
            style={errors?.username && { outline: "1px solid red" }}
            {...register("username", validationRules.username)}
            defaultValue={username}
          />
          {errors?.username && <span className={classes.errorMessage}>{errors?.username?.message}</span>}
        </label>

        <label>
          <span className={classes.inputName}>Email address</span>
          <input
            className={classes.input}
            type="email"
            placeholder="Email address"
            style={errors?.email && { outline: "1px solid red" }}
            {...register("email", validationRules.email)}
            defaultValue={email}
          />
          {errors?.email && <span className={classes.errorMessage}>{errors?.email?.message}</span>}
        </label>

        <label>
          <span className={classes.inputName}>New password</span>
          <input
            type="password"
            className={classes.input}
            placeholder="New password"
            style={errors?.password && { outline: "1px solid red" }}
            {...register("password", validationRules.password)}
          />
          {errors?.password && <span className={classes.errorMessage}>{errors?.password?.message}</span>}
        </label>
        <label>
          <span className={classes.inputName}>Avatar image (url)</span>
          <input
            type="url"
            className={classes.input}
            placeholder="Avatar image"
            style={errors?.avatarURL && { outline: "1px solid red" }}
            {...register("avatarURL", validationRules.url)}
            defaultValue={image || ""}
          />
          {errors?.avatarURL && <span className={classes.errorMessage}>{errors?.avatarURL?.message}</span>}
        </label>
        {submitButton}
      </form>
    </section>
  );
}

export default EditAccountPage;
