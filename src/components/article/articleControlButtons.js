import { useNavigate, Link } from "react-router-dom";
import { Popconfirm } from "antd";
import { useDispatch } from "react-redux";

import { deleteArticle } from "../../redux/actions/actions";

import classes from "./article.module.scss";

function ArticleControlButtons(props) {
  const { title, tagList, description, body, slug } = props.data;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDelete = async () => {
    try {
      await dispatch(deleteArticle(slug));
      navigate("/articles");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.controlWrapper}>
      <Popconfirm
        title="Are you sure to delete this article?"
        okText="Yes"
        cancelText="No"
        placement="left"
        onConfirm={onDelete}
        onCancel={() => {}}
      >
        <button type="button" className={`${classes.controlButton} ${classes.buttonDelete}`}>
          Delete
        </button>
      </Popconfirm>

      <Link
        to="edit"
        type="button"
        className={`${classes.controlButton} ${classes.buttonEdit}`}
        state={{
          title,
          description,
          body,
          tagList,
          slug,
        }}
      >
        Edit
      </Link>
    </div>
  );
}

export default ArticleControlButtons;
