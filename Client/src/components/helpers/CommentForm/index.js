import clsx from "clsx"
import styles from "./commentForm.module.scss"

export default function CommentForm() {
  return (
    <div className={clsx(styles.createComment)}>
      <img
        className={clsx(styles.leftCreateComment)}
        src="https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"
        alt="avatar"
      />

      <div className={clsx(styles.rightCreateComment)}>
        <textarea className={clsx(styles.textArea)} rows={8} cols={120} />
        &nbsp;
        <div className={clsx("clearfix")}>
          <button className={clsx(styles.postButton)}>Post</button>
        </div>
      </div>
    </div>
  );
}
