/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../spinner";
import { createArticle, changeArticle } from "../../redux/actions/actions";
import validationRules from "../../services/helpers/validationRules";

import classes from "./pages.module.scss";

function CreateArticlePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEditMode = Boolean(state);

  const tagList = isEditMode ? state.tagList : [];

  const { isAuthorized, isUserProcessing } = useSelector((store) => store.user);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      tagList,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tagList",
  });

  if (!isAuthorized && !isUserProcessing) {
    return <Navigate to="/sign-in" />;
  }

  async function onSubmit(data) {
    if (isEditMode) {
      try {
        await dispatch(changeArticle(state.slug, data));
        navigate(`/articles/${state.slug}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await dispatch(createArticle(data));
        navigate("/articles");
      } catch (err) {
        console.log(err);
      }
    }
  }

  const submitButton = isUserProcessing ? (
    <Spinner size={10} />
  ) : (
    <input
      type="submit"
      value={isEditMode ? "Save" : "Send"}
      className={`${classes.submit} ${classes.articleSubmit}`}
      disabled={!isValid}
    />
  );

  return (
    <section className={`${classes.accountForm} ${classes.articleForm}`}>
      <h3 className={classes.header}>{isEditMode ? "Edit article" : "Create new article"}</h3>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className={classes.inputName}>Title</span>
          <input
            className={classes.input}
            type="text"
            placeholder="Title"
            defaultValue={isEditMode ? state.title : ""}
            style={errors?.title && { outline: "1px solid red" }}
            {...register("title", validationRules.title)}
          />
          {errors?.title && <span className={classes.errorMessage}>{errors?.title?.title}</span>}
        </label>

        <label>
          <span className={classes.inputName}>Short description</span>
          <input
            className={classes.input}
            type="text"
            defaultValue={isEditMode ? state.description : ""}
            style={({ textTransform: "lowercase" }, errors?.description && { outline: "1px solid red" })}
            placeholder="Short description"
            {...register("description", validationRules.description)}
          />
          {errors?.description && <span className={classes.errorMessage}>{errors?.description?.message}</span>}
        </label>

        <label>
          <span className={classes.inputName}>Text</span>
          <textarea
            type="text"
            className={`${classes.input} ${classes.inputText}`}
            placeholder="Text"
            defaultValue={isEditMode ? state.body : ""}
            style={errors?.body && { outline: "1px solid red" }}
            {...register("body", validationRules.body)}
          />
          {errors?.body && <span className={classes.errorMessage}>{errors?.body?.message}</span>}
        </label>

        <span className={classes.inputName}>Tags</span>

        <div className={classes.tagsBlock}>
          <div className={classes.tagInputsColumn}>
            {fields.map((field, index) => {
              return (
                <div className={classes.tag} key={field.id}>
                  <input
                    className={`${classes.input} ${classes.inputTag}`}
                    {...register(`tagList.${index}`, validationRules.tag)}
                  />

                  <button
                    type="button"
                    className={`${classes.tagButton} ${classes.tagDelete}`}
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className={`${classes.tagButton} ${classes.tagAdd}`}
            onClick={() => {
              append();
            }}
          >
            Add tag
          </button>
        </div>

        {submitButton}
      </form>
    </section>
  );
}

export default CreateArticlePage;
