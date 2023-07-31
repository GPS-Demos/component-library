import { Field, ErrorMessage, useFormikContext } from "formik"

import { IFormVariable } from "@/utils/types"

import { InformationCircleIcon } from "@heroicons/react/24/outline"
import DocumentUpload from "@/components/DocumentUpload"

import { fileNameByPath } from "@/utils/forms"
import { useState } from "react"
import DeleteConfirmModal from "@/components/DeleteConfirmModal"
import { XMarkIcon } from "@heroicons/react/24/outline"

interface IFilesFieldProps {
  variable: IFormVariable
  deleteMessage: string
  deleteText: string
  close: string
}

type IfileFormat = {
  fileName: string | null | undefined
  fileURL: string
  fieldName: string
}

const FilesField: React.FC<IFilesFieldProps> = ({
  variable,
  deleteMessage,
  deleteText,
  close,
}) => {
  const { setFieldValue, values } = useFormikContext()
  const [modal, setModal] = useState(false)
  const [fileData, setFileData] = useState<IfileFormat | null>(null)
  const [loading, setLoading] = useState(false)

  //@ts-ignore
  const updatedFiles = values[variable.name]

  const fileNameContains: IfileFormat[] = []
  if (updatedFiles) {
    if (Array.isArray(updatedFiles)) {
      updatedFiles.forEach(async (value: string) => {
        const fileName = fileNameByPath(value)
        const supportingFileObj = {
          fileName: fileName,
          fileURL: value,
          fieldName: variable.name,
        }
        if (fileName) fileNameContains.push(supportingFileObj)
      })
    } else {
      const singleFileName = fileNameByPath(updatedFiles)
      const supportingFileObj = {
        fileName: singleFileName,
        fileURL: updatedFiles,
        fieldName: variable.name,
      }
      if (singleFileName && updatedFiles !== singleFileName)
        fileNameContains.push(supportingFileObj)
    }
  }

  const filesUpload: File[] = []

  const handleFiles = ({ files }: { files: FileList; type: string }) => {
    Array.from(files).map(async (file) => {
      filesUpload.push(file)
    })

    setFieldValue("files", filesUpload)
    if (variable.required) {
      setFieldValue(variable.name, files[0]?.name)
    }
  }

  const handleClick = (state: boolean, fileData: IfileFormat) => {
    setFileData(fileData)
    setModal(state)
  }

  const handleDelete = async () => {
    setLoading(true)
  }

  const renderModal = () => (
    <DeleteConfirmModal
      name={fileData?.fieldName}
      loading={loading}
      handleClick={handleClick}
      handleDelete={handleDelete}
      deleteMessage={deleteMessage}
      deleteText={deleteText}
      close={close}
    />
  )

  return (
    <>
      <div className="form-control" key={variable.name}>
        <label htmlFor={variable.name}>
          {variable.question}
          {variable.tooltip && (
            <span
              className="tooltip-top tooltip tooltip-primary relative top-1 left-1"
              data-tip={variable.tooltip}
            >
              <InformationCircleIcon className="h-5 w-5" />
            </span>
          )}
        </label>

        <DocumentUpload
          label={variable.fileLabel || "files"}
          type="files"
          multiple={variable.multiple}
          accept={variable.accept}
          handleFiles={handleFiles}
        />
        <Field
          id={variable.name}
          name={variable.name}
          className="input hidden"
        />

        <div className="mt-1 text-xs text-error">
          <ErrorMessage name={variable.name} />
        </div>
        <div>
          {fileNameContains.map((value: IfileFormat) => {
            return (
              <div
                key={value.fileName}
                className="badge badge-info mt-2 h-auto w-auto gap-1 py-1 px-2 md:py-1 md:px-4"
              >
                <span className="text-xs">{value.fileName}</span>
                <XMarkIcon
                  onClick={() => handleClick(true, value)}
                  className="h-6 w-6 cursor-pointer"
                />
              </div>
            )
          })}
        </div>
        <div className="text-faint mt-1 text-sm">{variable.description}</div>
        {modal && renderModal()}
      </div>
    </>
  )
}

export default FilesField
