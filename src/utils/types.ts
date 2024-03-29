import { z } from "zod"

const FIELD_TYPE = [
  "string",
  "number",
  "bool",
  "select",
  "multiselect",
  "list(string)",
  "file",
  "radio",
  "dob",
  "buttongroup",
  "selectgroup",
] as const

export const fieldType = z.enum(FIELD_TYPE)

// export const FormVariable = z.object({
//   name: z.string(),
//   display: z.string(),
//   type: fieldType,
//   description: z.string(),
//   default: z.any().optional(),
//   required: z.boolean(),
//   group: z.number(),
//   options: z.string().array().optional(),
//   tooltip: z.string().optional(),
//   fileLabel: z.string().optional(),
//   multiple: z.boolean().default(false).optional(),
//   accept: z.string().optional(),
//   hasDependent:z.boolean().default(false).optional(),
//   dependsOnQuestion: z.string().optional(),
//   dependsOnAnswer: z.string().optional(),
//   subvariables: z
//     .array(
//       z.object({
//         name: z.string(),
//         display: z.string(),
//         type: fieldType,
//         description: z.string(),
//         default: z.any().optional(),
//         required: z.boolean(),
//         group: z.number(),
//         options: z.string().array().optional(),
//       }),
//     )
//     .optional(),
// })

export const FormVariable = z.object({
  name: z.string(),
  display: z.string(),
  type: fieldType,
  description: z.string().optional(),
  default: z.unknown().optional(),
  required: z.boolean().default(true),
  validations: z.string().optional(),
  group: z.string().optional(),
  order: z.number().default(999),
  suborder: z.number().optional(),
  primaryId: z.number().optional(),
  choosenOption: z.number().optional(),
  options: z
    .array(
      z.object({
        display: z.string(),
        value: z.unknown(),
      }),
    )
    .optional(),
  tooltip: z.string().optional(),
  fileLabel: z.string().optional(),
  multiple: z.boolean().default(false).optional(),
  accept: z.string().optional(),
  icons: z.boolean().default(false).optional(),
})

//const SubElement = z.object({subelement: z.array(FormVariable) }).optional()
export type IFormVariable = z.infer<typeof FormVariable>

//const SubElement = z.object({ subelement: z.array(FormVariable) }).optional()

//export const FormVariableNested = z.union([FormVariable, SubElement])
//export const FormVariableNested = z.intersection(FormVariable, SubElement)

//export type IFormVariable = z.infer<typeof FormVariableNested>

export type IFormData = {
  [key: string]: string | number | boolean
}

export type IFieldValidateValue = { value: string | number | boolean }

export type IFormValidationData = {
  [key: string]: any
}
