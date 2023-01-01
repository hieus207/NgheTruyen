
export default function ConfirmDelete({onConfirm = null, onCancel = null}){
    return(
        <div className="d-flex f-column j-center">
            Bạn có chắc muốn xoá?
            <div className="d-flex f-row j-center m-top-20">
                <button onClick={()=>onCancel()}>Không</button>
                &nbsp;
                &nbsp;
                <button onClick={onConfirm} className="delete_btn">Có</button>
            </div>
        </div>
    )
}