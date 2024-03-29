import { useEffect, useState } from "react"
import Loading from "@/components/Loading"

interface IDeleteConfirmModal {
  name?: string
  loading: Boolean
  handleClick: Function
  handleDelete: Function
  deleteMessage: string
  deleteText: string
  close: string
}

const DeleteConfirmModal: React.FC<IDeleteConfirmModal> = ({
  name,
  loading,
  handleClick,
  handleDelete,
  deleteMessage,
  deleteText,
  close,
}) => {
  const [modal, setModal] = useState(true)

  useEffect(() => {
    if (modal) {
      // @ts-ignore
      window.delete_file_modal.showModal()
    }
  }, [modal])

  return (
    <dialog id="delete_file_modal" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="text-lg font-bold">{deleteText}</h3>
        <p className="py-4">{deleteMessage}</p>
        <p className="text-md font-normal">{name}</p>
        <div className="modal-action">
          {loading ? (
            <Loading />
          ) : (
            <button
              className="btn btn-error"
              type="button"
              onClick={handleDelete()}
            >
              {deleteText}
            </button>
          )}
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => {
              setModal(false), handleClick(false)
            }}
          >
            {close}
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default DeleteConfirmModal
