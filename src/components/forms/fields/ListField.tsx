import { Field, FieldArray } from "formik"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

import { IFormVariable } from "@/utils/types"

interface ListFieldProps {
  variable: IFormVariable
}

const ListField: React.FC<ListFieldProps> = ({ variable }) => {
  const [formFieldValue, setFormFieldValue] = useState("")

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormFieldValue(event.target.value)
  }

  const onSetValue =
    (FieldArrayPropsPush: Function) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (formFieldValue) {
        FieldArrayPropsPush(formFieldValue)
      }
      setFormFieldValue("")
    }

  const handleKeyboardEvent =
    (FieldArrayPropsPush: Function) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        if (formFieldValue) {
          FieldArrayPropsPush(formFieldValue)
        }
        setFormFieldValue("")
      }
    }

  return (
    <div className="form-control" key={variable.name}>
      <label htmlFor={variable.name}>{variable.display}</label>
      <FieldArray name={variable.name}>
        {(FieldArrayProps: any) => {
          const { push, remove, form } = FieldArrayProps
          const { values } = form
          const unique = [...new Set(values[variable.name])]
          values[variable.name] = unique
          return (
            <>
              {values[variable.name].map((setvalue: string, index: number) => (
                <div
                  key={setvalue}
                  className="badge badge-info mt-2 h-auto w-auto py-1 px-2 md:py-1 md:px-4"
                >
                  <span
                    className="w-11/12 text-xs"
                    style={{ overflowWrap: "anywhere" }}
                  >
                    {setvalue}
                  </span>
                  <span
                    onClick={() => remove(index)}
                    className="cursor-pointer"
                  >
                    X
                  </span>
                </div>
              ))}
              <div className="mt-1 flex w-full">
                <Field
                  name="listfield"
                  className="input input-bordered w-full"
                  value={formFieldValue}
                  onChange={inputHandler}
                  onKeyDown={handleKeyboardEvent(push)}
                />
                <button
                  type="button"
                  className="btn btn-outline btn-secondary ml-2"
                  onClick={onSetValue(push)}
                >
                  <PlusIcon className="h-6 w-6" />
                </button>
              </div>
            </>
          )
        }}
      </FieldArray>
      <div className="text-faint mt-1 text-sm">{variable.description}</div>
    </div>
  )
}

export default ListField
