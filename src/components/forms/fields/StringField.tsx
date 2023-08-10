import { Field, FormikContextType, FormikProvider } from "formik"

import { IFormVariable } from "@/utils/types"

import FieldErrorMessage from "@/components/forms/FieldErrorMessage"

interface IStringFieldProps {
  variable: IFormVariable
  onChangeHandle: Function
  formikProps: FormikContextType<any>
}

const StringField: React.FC<IStringFieldProps> = ({
  variable,
  onChangeHandle,
  formikProps,
}) => {
  const { setFieldValue } = formikProps

  const onChangeHandleInput = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFieldValue(e.target.name, e.target.value)
    onChangeHandle(e)
  }

  return (
    <FormikProvider value={formikProps}>
      <div className="form-control" key={variable.name}>
        <Field
          id={variable.name}
          name={variable.name}
          placeholder={variable.display}
          onChange={onChangeHandleInput}
          className="input input-bordered input-sm"
        />
        <FieldErrorMessage variableName={variable.name} />
        <div className="text-faint mt-1 text-sm">{variable.description}</div>
      </div>
    </FormikProvider>
  )
}

export default StringField
