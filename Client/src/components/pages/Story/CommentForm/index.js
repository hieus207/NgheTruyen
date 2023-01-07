import clsx from "clsx"
import styles from "./commentForm.module.scss"
import { useDispatch } from "react-redux"
import { COMMENT_CONTENT, MAX_LENGTH_COMMENT_CONTENT, MAX_LENGTH_COMMENT_SENDER, MIN_LENGTH_COMMENT_CONTENT, MIN_LENGTH_COMMENT_SENDER, SENDER_NAME, SEND_COMMENT_BTN } from "../../../../constants"
import { TextareaAutosize, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import useInputObject from "../../../../hooks/useInputObject"
import { commentSlice } from "../../../../redux/reducers/commentSlice"

export default function CommentForm({id, isSubComment = false }) {
  const [data, setData, setDataObj] = useInputObject({
    [isSubComment? "commentId" : "storyId"] : id,
    senderName: "",
    content: ""
  })
  const [error,SetError] = useState("")

  const dispatch = useDispatch()
  const handlePost = (e) => {
      e.preventDefault()

      if(!isSubComment){
        setDataObj({...data,content:""})
        dispatch(commentSlice.actions.createCommentRequest(data))    
      }
      else{
        setDataObj({...data,content:""})
        dispatch(commentSlice.actions.createSubCommentRequest(data))
      }
        
  }

  useEffect(()=>{
    if(data.content.length>=MIN_LENGTH_COMMENT_CONTENT)
      SetError("")
  },[data.content])

  return (
    <div className={clsx(styles.createComment)}>
      <img
        className={clsx(styles.leftCreateComment,"round")}
        src="https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"
        alt="avatar"
      />

      <form className={clsx(styles.rightCreateComment)} onSubmit={handlePost}>
        <div className={clsx(styles.senderName)} >
        <TextField sx={{fontSize:5}} size="small" label={SENDER_NAME} value={data.senderName} onChange={setData("senderName")}  inputProps={{minLength:MIN_LENGTH_COMMENT_SENDER, maxLength: MAX_LENGTH_COMMENT_SENDER }} required/>

        </div>
        <TextField fullWidth minRows={2} maxRows={3} label={COMMENT_CONTENT} onInvalid={()=>SetError("Tối thiểu " + MIN_LENGTH_COMMENT_CONTENT + " ký tự")} FormHelperTextProps={{className: clsx(styles.helperText)}} helperText={error}  onChange={setData("content")} value={data.content} inputProps={{ minLength: MIN_LENGTH_COMMENT_CONTENT, maxLength: MAX_LENGTH_COMMENT_CONTENT }} multiline required/>

        &nbsp;
        <div className={clsx("clearfix")}>
          <button className={clsx(styles.postButton)} >{SEND_COMMENT_BTN}</button>
        </div>
      </form>
    </div>
  );
}
