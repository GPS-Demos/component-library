import { Field, useFormikContext, FormikValues } from "formik"

import { IFormVariable } from "../../../utils/types"

import FieldErrorMessage from "../FieldErrorMessage"
import { classNames } from "../../../utils/dom"
import { CheckCircleIcon, StopCircleIcon } from "@heroicons/react/24/outline"

interface IRadioFieldProps {
  variable: IFormVariable
  onChangeHandle: Function
}

const RadioField: React.FC<IRadioFieldProps> = ({
  variable,
  onChangeHandle,
}) => {
  const { values } = useFormikContext<FormikValues>()

  return (
    <div className="form-control" key={variable.name}>
      <div className="flex gap-2">
        {variable.options?.map((option) => {
          return (
            <label
              className={classNames(
                "flex gap-2 rounded-md px-2 py-1 border cursor-pointer",
                values[variable.name] === option
                  ? "outline  border-primary"
                  : "",
              )}
              key={option.oId}
            >
              <Field
                type="radio"
                className="hidden"
                onChange={onChangeHandle}
                name={variable.name}
                value={option.oId}
              />
              <span className="w-5 h-5">
                {values[variable.name] == option.oId ? (
                  <span>
                    <CheckCircleIcon className="w-5 h-auto text-success relative top-0.5" />
                  </span>
                ) : (
                  <span>
                    <StopCircleIcon className="w-5 h-auto text-error relative top-0.5" />
                  </span>
                )}
              </span>
              {option.value}
            </label>
          )
        })}
      </div>
      <FieldErrorMessage variableName={variable.name} />
      <div className="text-faint mt-1 text-sm">{variable.description}</div>
    </div>
  )
}

export default RadioField
