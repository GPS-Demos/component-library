import {
  FieldArray,
  useFormikContext,
  FormikValues,
  FieldArrayRenderProps,
} from "formik"

import { IFormVariable } from "@/utils/types"

import FieldErrorMessage from "@/components/forms/FieldErrorMessage"

interface MultiSelectFieldProps {
  variable: IFormVariable
  onChangeHandle: Function
  selected: string
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  variable,
  onChangeHandle,
  selected,
}) => {
  const { values } = useFormikContext<FormikValues>()

  const isChecked = (value: unknown) =>
    values[variable.name].includes(value?.toString())

  const onSelectValues =
    (fieldArrayProps: FieldArrayRenderProps) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedId = event.target.getAttribute("data-id")
      event.preventDefault()
      const selectedType = event.target.checked
      const { push, remove } = fieldArrayProps
      if (selectedId && selectedType) {
        push(selectedId)
      } else {
        const findIndex = values[variable.name].indexOf(selectedId)
        remove(findIndex)
      }
      onChangeHandle(variable.name, selectedId)
    }

  return (
    <div className="form-control" key={variable.name}>
      {/* <label htmlFor={variable.name}>{variable.question}</label> */}
      <FieldArray name={variable.name}>
        {(fieldArrayProps: FieldArrayRenderProps) => {
          const { form } = fieldArrayProps
          const { values } = form
          const unique = [...new Set(values[variable.name])]
          values[variable.name] = unique
          return (
            <>
              <div className="mt-1 w-full">
                <div className="dropdown w-full">
                  <input
                    tabIndex={0}
                    type="text"
                    placeholder="Select"
                    className="input input-bordered input-sm w-full readonly"
                    value={`${selected} (${values[variable.name].length})`}
                    readOnly
                  />
                  <ul
                    tabIndex={0}
                    className="dropdown-content dropdown-open p-2 shadow bg-base-100 max-h-64 overflow-auto w-full"
                  >
                    {variable.options?.map((option) => {
                      return (
                        <li key={option.display}>
                          <div className="form-control">
                            <label className="text-left cursor-pointer">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-primary checkbox-sm"
                                data-id={option.value}
                                onChange={onSelectValues(fieldArrayProps)}
                                checked={isChecked(option.value)}
                              />
                              <span className="ml-1 relative -top-1">
                                {option.display}
                              </span>
                            </label>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </>
          )
        }}
      </FieldArray>
      <FieldErrorMessage variableName={variable.name} />
      <div className="text-sm text-faint mt-1">{variable.description}</div>
    </div>
  )
}

export default MultiSelectField
