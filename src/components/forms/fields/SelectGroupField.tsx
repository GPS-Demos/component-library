import {
  Field,
  FieldArray,
  FieldArrayRenderProps,
  FormikContextType,
  FormikProvider,
} from "formik"

import { IFormVariable } from "@/utils/types"

import FieldErrorMessage from "@/components/forms/FieldErrorMessage"
import { classNames } from "@/utils/dom"

interface SelectGroupFieldProps {
  variable: IFormVariable
  onChangeHandle: Function
  formikProps: FormikContextType<any>
}

const SelectGroupField: React.FC<SelectGroupFieldProps> = ({
  variable,
  onChangeHandle,
  formikProps,
}) => {
  const { values } = formikProps

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
    <FormikProvider value={formikProps}>
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
                  <div className="flex gap-2">
                    {variable.options?.map((option) => {
                      return (
                        <label
                          key={option.display}
                          className={classNames(
                            "flex gap-2 rounded-md px-2 py-1 cursor-pointer text-center",
                            isChecked(option.value)
                              ? "border-primary text-content border-2"
                              : "border-base-300 text-base-content border",
                          )}
                        >
                          <div className="w-full">
                            <Field
                              type="checkbox"
                              className="checkbox checkbox-sm hidden"
                              data-id={option.value}
                              onChange={onSelectValues(fieldArrayProps)}
                              checked={isChecked(option.value)}
                            />
                            <span className="relative -top-0.5">
                              {option.display}
                            </span>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </>
            )
          }}
        </FieldArray>
        <FieldErrorMessage variableName={variable.name} />
        <div className="text-sm text-faint mt-1">{variable.description}</div>
      </div>
    </FormikProvider>
  )
}

export default SelectGroupField
