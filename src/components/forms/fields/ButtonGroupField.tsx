import { Field, FormikContextType, FormikProvider } from "formik"

import { IFormVariable } from "@/utils/types"

import FieldErrorMessage from "@/components/forms/FieldErrorMessage"
import { classNames } from "@/utils/dom"

interface IButtonGroupFieldProps {
  variable: IFormVariable
  onChangeHandle: Function
  formikProps: FormikContextType<any>
}

const ButtonGroupField: React.FC<IButtonGroupFieldProps> = ({
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
        <div className="flex gap-2">
          <div className="join">
            {variable.options?.map((option) => {
              return (
                <Field
                  key={option.display}
                  type="radio"
                  className={classNames(
                    "join-item btn btn-sm",
                    values[variable.name] ==
                      (option.value || option.value?.toString())
                      ? "btn-primary text-base-100"
                      : "",
                  )}
                  onChange={handleChangeOption}
                  name={variable.name}
                  value={option.value}
                  aria-label={option.display}
                />
              )
            })}
          </div>
        </div>
        <FieldErrorMessage variableName={variable.name} />
        <div className="text-faint mt-1 text-sm">{variable.description}</div>
      </div>
    </FormikProvider>
  )
}

export default ButtonGroupField
