
export default function ConfirmDelete({onConfirm = null, onCancel = null}){
    return(
        <div className="d-flex f-column">
            Bạn có chắc muốn xoá?
            <div>
                <button onClick={onCancel}>Không</button>
                <button onClick={onConfirm}>Có</button>
            </div>
        </div>
    )
}