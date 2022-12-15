import clsx from "clsx"
import styles from "./commentForm.module.scss"
import useInputObject from "../../../hooks/useInputObject"
import { useDispatch } from "react-redux"
import { commentSlice } from "../../../redux/reducers/commentSlice"

export default function CommentForm({id, isSubComment = false}) {
  const [data, setData, setDataObj] = useInputObject({
    [isSubComment? "commentId" : "storyId"] : id,
    senderName: "",
    content: ""
  })

  const dispatch = useDispatch()
  const handlePost = () => {
      if(!isSubComment)
        dispatch(commentSlice.actions.createCommentRequest(data))    
      else
        dispatch(commentSlice.actions.createSubCommentRequest(data))
  }

  return (
    <div className={clsx(styles.createComment)}>
      <img
        className={clsx(styles.leftCreateComment)}
        src="https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"
        alt="avatar"
      />

      <div className={clsx(styles.rightCreateComment)}>
      <input className={clsx(styles.senderName)} placeholder="Tên của bạn" value={data.senderName} onChange={setData("senderName")} />
        <textarea className={clsx(styles.textArea)} rows={8} cols={120} value={data.content} onChange={setData("content")} />
        &nbsp;
        <div className={clsx("clearfix")}>
          <button className={clsx(styles.postButton)} onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  );
}
