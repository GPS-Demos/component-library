import { Field, FormikContextType, FormikProvider } from "formik"

import { IFormVariable } from "@/utils/types"

import FieldErrorMessage from "@/components/forms/FieldErrorMessage"

interface ISelectFieldProps {
  variable: IFormVariable
  onChangeHandle: Function
  select: string
  formikProps: FormikContextType<any>
}

const SelectField: React.FC<ISelectFieldProps> = ({
  variable,
  onChangeHandle,
  select,
  formikProps,
}) => {
  const { setFieldValue } = formikProps
  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(e.target.name, e.target.value)
    onChangeHandle(e)
  }
  return (
    <FormikProvider value={formikProps}>
      <div className="form-control" key={variable.name}>
        <Field
          as="select"
          id={variable.name}
          name={variable.name}
          className="select select-bordered select-sm font-normal"
          onChange={handleChangeOption}
        >
          <option value="">{select}</option>
          {variable.options?.map((option) => {
            return (
              <option key={option.display} value={option.value as string}>
                {option.display}
              </option>
            )
          })}
        </Field>
        <FieldErrorMessage variableName={variable.name} />
        <div className="text-faint mt-1 text-sm">{variable.description}</div>
      </div>
    </FormikProvider>
  )
}

export default SelectField
