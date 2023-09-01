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
import { CircleStackIcon } from "@heroicons/react/24/outline"

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
      if (!variable.multiple) values[variable.name] = []
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
                  <div className="flex gap-4">
                    {variable.options?.map((option) => {
                      return (
                        <label
                          key={option.display}
                          className={classNames(
                            "flex gap-2 rounded-md px-2 py-1 cursor-pointer outline",
                            isChecked(option.value)
                              ? "outline-primary text-primary"
                              : "outline-base-300 text-base-content",
                          )}
                        >
                          <div className="w-full flex-wrap justify-center items-center">
                            <Field
                              type="checkbox"
                              className="checkbox checkbox-sm hidden"
                              data-id={option.value}
                              onChange={onSelectValues(fieldArrayProps)}
                              checked={isChecked(option.value)}
                            />
                            {variable.icons && (
                              <div className="w-full text-center">
                                <CircleStackIcon
                                  className={classNames(
                                    "w-8 h-auto inline-block place-items-center",
                                    isChecked(option.value)
                                      ? " text-primary"
                                      : "text-base-200",
                                  )}
                                />
                              </div>
                            )}
                            <div className="w-full">
                              <span className="text-content">
                                {option.display}
                              </span>
                            </div>
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
