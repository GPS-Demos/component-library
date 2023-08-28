import { useState } from "react"
import { ExclamationCircleIcon, PhotoIcon } from "@heroicons/react/24/outline"
import { classNames } from "@/utils/dom"
import Loading from "@/components/Loading"

const defaultAccept = "image/*,.pdf"

enum FileStatus {
  Pending,
  Uploading,
  Success,
  Failed,
}

const DocumentUpload = ({
  type,
  label,
  handleFiles,
  accept,
  multiple,
}: {
  type: string
  label: string
  handleFiles: Function
  accept?: string
  multiple?: boolean
}) => {
  const [fileUploadStatus, setFileUploadStatus] = useState<FileStatus>(
    FileStatus.Pending,
  )
  const [filesLabel, setFilesLabel] = useState<string | null>(null)
  const [previewURL, setPreviewURL] = useState<string | null>(null)
  const [uploadedFileType, setUploadedFileType] = useState<string | null>(null)
  multiple = multiple ?? false

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setFileUploadStatus(FileStatus.Uploading)

    try {
      await handleFiles({ files, type, label })
      setFileUploadStatus(FileStatus.Success)

      setFilesLabel(
        files.length > 1
          ? `${files.length} files added`
          : files[0]?.name ?? "File added",
      )

      setUploadedFileType(files[0].type)
      setPreviewURL(URL.createObjectURL(files[0]))
    } catch (error) {
      setFileUploadStatus(FileStatus.Failed)
      setFilesLabel(null)
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <label
        htmlFor={type}
        className={classNames(
          "flex w-full cursor-pointer flex-col rounded-md transition",
          fileUploadStatus === FileStatus.Failed
            ? "border-error"
            : fileUploadStatus === FileStatus.Success
            ? "border-success"
            : "text-faint group-hover:text-normal",
        )}
      >
        <div className="flex flex-col items-center justify-center pt-7">
          {fileUploadStatus === FileStatus.Failed ? (
            <ExclamationCircleIcon className="h-10 text-error transition" />
          ) : fileUploadStatus === FileStatus.Success ? (
            previewURL ? (
              uploadedFileType?.includes("pdf") ? (
                <iframe
                  src={previewURL}
                  className="m-auto mb-1 max-h-80 max-w-xs"
                ></iframe>
              ) : (
                <img
                  src={previewURL}
                  alt="preview img"
                  className="m-auto mb-1 max-h-80 max-w-xs"
                />
              )
            ) : (
              <div className="h-10 relative flex w-full items-center justify-center">
                <PhotoIcon className="h-12 w-12 text-base-300" />
              </div>
            )
          ) : fileUploadStatus === FileStatus.Uploading ? (
            <Loading />
          ) : (
            <PhotoIcon className="h-12 w-12 text-base-300" />
          )}
          <p
            className={classNames(
              fileUploadStatus === FileStatus.Failed
                ? "text-error-content"
                : fileUploadStatus === FileStatus.Success
                ? "text-success-content"
                : "text-base-content",
              "pt-1 text-sm font-semibold",
            )}
          >
            {filesLabel}
          </p>
          <p className="text-base-content pt-1 text-sm font-semibol mt-2 font-semibold text-dim">
            {label}
          </p>
        </div>
        <input
          id={type}
          type="file"
          name={type}
          className="w-full cursor-pointer opacity-0 absolute min-h-full max-h-80 bottom-0"
          accept={accept || defaultAccept}
          onChange={onChange}
          multiple={multiple}
          disabled={fileUploadStatus === FileStatus.Uploading}
        />
      </label>
    </div>
  )
}

export default DocumentUpload
