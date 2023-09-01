import { Field, FormikContextType, FormikProvider } from "formik"

import { IFormVariable } from "@/utils/types"

import FieldErrorMessage from "@/components/forms/FieldErrorMessage"
import { classNames } from "@/utils/dom"
import { CheckCircleIcon, StopCircleIcon } from "@heroicons/react/24/outline"

interface IRadioFieldProps {
  variable: IFormVariable
  onChangeHandle: Function
  formikProps: FormikContextType<any>
}

const RadioField: React.FC<IRadioFieldProps> = ({
  variable,
  onChangeHandle,
  formikProps,
}) => {
  const { values, setFieldValue } = formikProps

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(e.target.name, e.target.value)
    onChangeHandle(e)
  }

  return (
    <FormikProvider value={formikProps}>
      <div className="form-control" key={variable.name}>
        <div className="flex gap-4">
          {variable.options?.map((option) => {
            return (
              <label
                className={classNames(
                  "flex gap-2 rounded-md px-2 py-1 cursor-pointer outline",
                  values[variable.name] ==
                    (option.value || option.value?.toString())
                    ? "outline-primary text-primary"
                    : "outline-base-300 text-base-content",
                )}
                key={option.display}
              >
                <Field
                  type="radio"
                  className="hidden"
                  onChange={handleChangeOption}
                  name={variable.name}
                  value={option.value}
                />
                <span className="w-5 h-5">
                  {values[variable.name] == option.value ? (
                    <span>
                      <CheckCircleIcon className="w-5 h-auto text-primary relative top-0.5" />
                    </span>
                  ) : (
                    <span>
                      <StopCircleIcon className="w-5 h-auto text-base-300 relative top-0.5" />
                    </span>
                  )}
                </span>
                {option.display}
              </label>
            )
          })}
        </div>
        <FieldErrorMessage variableName={variable.name} />
        <div className="text-faint mt-1 text-sm">{variable.description}</div>
      </div>
    </FormikProvider>
  )
}

export default RadioField
