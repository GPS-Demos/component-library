import { useState } from "react"
import {
  CloudArrowUpIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline"
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
    } catch (error) {
      setFileUploadStatus(FileStatus.Failed)
    }
  }

  return (
    <div className="group flex w-full items-center justify-center">
      <label
        htmlFor={type}
        className={classNames(
          "flex h-32 w-full cursor-pointer flex-col rounded-md border-4 border-dashed transition",
          fileUploadStatus === FileStatus.Failed
            ? "border-error"
            : fileUploadStatus === FileStatus.Success
            ? "border-success"
            : "text-faint group-hover:text-normal border-base-300",
        )}
      >
        <div className="flex flex-col items-center justify-center pt-7">
          {fileUploadStatus === FileStatus.Failed ? (
            <ExclamationCircleIcon className="h-10 text-error transition" />
          ) : fileUploadStatus === FileStatus.Success ? (
            <CheckCircleIcon className="h-10 text-success transition" />
          ) : fileUploadStatus === FileStatus.Uploading ? (
            <Loading />
          ) : (
            <CloudArrowUpIcon className="h-10 text-neutral" />
          )}
          <p
            className={classNames(
              fileUploadStatus === FileStatus.Failed
                ? "text-error"
                : fileUploadStatus === FileStatus.Success
                ? "text-success"
                : "text-base-content",
              "pt-1 text-lg font-semibold",
            )}
          >
            {filesLabel || label}
          </p>
        </div>
        <input
          id={type}
          type="file"
          name={type}
          className="w-full cursor-pointer opacity-0"
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
