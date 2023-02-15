/* eslint-disable react/no-array-index-key */
import classes from "./tags.module.scss";

export default function Tags(props) {
  const { tags } = props;

  const tagList = tags.reduce((acc, currTag, i) => {
    if (currTag.length > 0) {
      acc.push(
        <span key={i} className={classes.tag}>
          {currTag}
        </span>
      );
    }
    return acc;
  }, []);

  return <div className={classes.tagList}>{tagList}</div>;
}
