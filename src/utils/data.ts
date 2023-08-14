import { IFormVariable } from "../utils/types"

// export const TEST_FORM_DATA: IFormVariable[] = [
//   {
//     name: "name",
//     display: "Name",
//     type: "string",
//     description: "",
//     default: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "description",
//     display: "Description",
//     type: "string",
//     description: "",
//     default: "",
//     required: true,
//     group: 1,
//   },
//   {
//     name: "option",
//     display: "Select Option",
//     type: "select",
//     description: "",
//     options: ["option1", "option2"],
//     default: "option1",
//     required: false,
//     group: 1,
//   },
//   {
//     name: "optionradio",
//     display: "Option Test",
//     type: "selectradio",
//     description: "",
//     options: ["option1", "option2", "option3"],
//     default: "option1",
//     required: false,
//     group: 1,
//   },
//   {
//     name: "link",
//     display: "Primary Link",
//     type: "string",
//     description: "",
//     default: "",
//     required: false,
//     group: 2,
//   },
//   {
//     name: "otherLinks",
//     display: "Other Links",
//     type: "list(string)",
//     description: "",
//     default: [],
//     required: false,
//     group: 2,
//   },
// ]

export const TEST_NESTED_FORM_DATA: IFormVariable[] = [
  {
    name: "firstName",
    display: "First Name",
    type: "string",
    description: "",
    default: "",
    required: true,
    group: "personal",
    order: 1,
    suborder: 1,
  },
  {
    name: "lastName",
    display: "Last Name",
    type: "string",
    description: "",
    default: "",
    required: true,
    group: "personal",
    order: 1,
    suborder: 2,
  },
  {
    name: "emailId",
    display: "Email",
    type: "string",
    description: "",
    default: "",
    required: true,
    validations: "email",
    group: "personal",
    order: 2,
  },
  {
    name: "birthDate",
    display: "Date of birth",
    type: "dob",
    description: "",
    default: "",
    required: false,
    group: "personal",
    order: 3,
    suborder: 1,
  },
  {
    name: "age",
    display: "Age",
    type: "string",
    description: "",
    default: "",
    required: false,
    group: "personal",
    order: 3,
    suborder: 2,
  },
  {
    name: "chooseOption",
    display: "Choose from the options",
    type: "radio",
    description: "",
    default: "",
    required: false,
    options: [
      { display: "Yes", value: 1 },
      { display: "No", value: 2 },
    ],
    group: "select",
    order: 4,
  },
  {
    name: "optionYes",
    display: "Question if Yes",
    type: "string",
    description: "",
    default: "",
    required: false,
    group: "select",
    order: 5,
    primaryId: 6,
    choosenOption: 1,
  },
  {
    name: "optionNo",
    display: "Question if No",
    type: "string",
    description: "",
    default: "",
    required: false,
    group: "select",
    order: 6,
    primaryId: 6,
    choosenOption: 2,
  },
  {
    name: "selectOption",
    display: "Select from the options",
    type: "select",
    description: "",
    default: "",
    required: true,
    options: [
      { display: "Option 1", value: 1 },
      { display: "Option 2", value: 2 },
      { display: "Option 3", value: 3 },
    ],
    group: "select",
    order: 7,
  },
  {
    name: "testmer",
    display: "is benifits?",
    type: "bool",
    description: "",
    default: false,
    required: false,
    order: 8,
  },
  {
    name: "selectMultiOption",
    display: "Select Multiple from the options",
    type: "multiselect",
    description: "",
    default: [],
    required: false,
    options: [
      { display: "Option1", value: 1 },
      { display: "Option2", value: 2 },
      { display: "Option3", value: 3 },
    ],
    order: 9,
  },
  {
    name: "testFiles",
    display: "Test Files item",
    type: "file",
    description: "",
    default: [],
    required: false,
    multiple: true,
    accept: "image/*,.pdf",
    fileLabel: "Upload a file or drag and drop",
    order: 10,
  },
  {
    name: "testBackgroundItem",
    display: "Test Background item",
    type: "string",
    description: "",
    default: "",
    required: false,
    validations: "email",
    order: 11,
  },
]

export const FORM_STEPS_TITLE: string[] = [
  "General",
  "Background",
  "Employment",
  "Income",
  "Health",
  "Assistance",
]

export const FORM_LABEL_DISPLAY_OPTIONS = {
  submitDisplay: "Submit",
  nextDisplay: "Next",
  prevDisplay: "Previous",
  cancelDisplay: "Cancel",
  submitLoadingDisplay: "Submitting",
}
