import { Field, ErrorMessage, FormikProvider, FormikContextType } from "formik"
import { IFormVariable } from "@/utils/types"
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import DocumentUpload from "@/components/DocumentUpload"
import { fileNameByPath } from "@/utils/forms"
import { useState } from "react"
import DeleteConfirmModal from "@/components/DeleteConfirmModal"

interface IFilesFieldProps {
  variable: IFormVariable
  onChangeHandle: Function
  deleteMessage: string
  deleteText: string
  close: string
  formikProps: FormikContextType<any>
}

type IFileFormat = {
  fileName: string | null
  fileURL: string
  fieldName: string
}

const FilesField: React.FC<IFilesFieldProps> = ({
  variable,
  onChangeHandle,
  deleteMessage,
  deleteText,
  close,
  formikProps,
}) => {
  const [modal, setModal] = useState(false)
  const [fileData, setFileData] = useState<IFileFormat | null>(null)
  const [loading, setLoading] = useState(false)

  const { setFieldValue, values } = formikProps

  //@ts-ignore
  const updatedFiles = values[variable.name]

  const fileNameContains: IFileFormat[] = []
  if (updatedFiles) {
    if (Array.isArray(updatedFiles)) {
      updatedFiles.forEach(async (value: File) => {
        const fileName = fileNameByPath(value.name)
        const supportingFileObj = {
          fileName: fileName,
          fileURL: value.name,
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

  const handleFiles = ({ files }: { files: FileList; type: string }) => {
    onChangeHandle(variable.name, Array.from(files))
    setFieldValue(variable.name, Array.from(files))
  }

  const handleClick = (state: boolean, fileData: IFileFormat) => {
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
    <FormikProvider value={formikProps}>
      <div className="form-control" key={variable.name}>
        <label htmlFor={variable.name}>
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
        {/* <div>
          {fileNameContains.map((value: IFileFormat) => {
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
        </div> */}
        <div className="text-faint mt-1 text-sm">{variable.description}</div>
        {modal && renderModal()}
      </div>
    </FormikProvider>
  )
}

export default FilesField
