import { CONFIRM_DELETE, CONFIRM_DELETE_NO, CONFIRM_DELETE_YES } from "../../../constants";

export default function ConfirmDelete({onConfirm = null, onCancel = null}){
    return(
        <div className="d-flex f-column j-center">
            {CONFIRM_DELETE}
            <div className="d-flex f-row j-center m-top-20">
                <button onClick={()=>onCancel()}>{CONFIRM_DELETE_NO}</button>
                &nbsp;
                &nbsp;
                <button onClick={onConfirm} className="delete_btn">{CONFIRM_DELETE_YES}</button>
            </div>
        </div>
    )
}