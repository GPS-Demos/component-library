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
    questionId: 1,
    question: "First Name",
    type: "string",
    description: "",
    default: "",
    required: true,
    group: 1,
    order: 1,
    suborder: 1,
  },
  {
    name: "lastName",
    questionId: 2,
    question: "Last Name",
    type: "string",
    description: "",
    default: "",
    required: true,
    group: 1,
    order: 1,
    suborder: 2,
  },
  {
    name: "emailId",
    questionId: 3,
    question: "Email",
    type: "string",
    description: "",
    default: "",
    required: true,
    validations: "email",
    group: 1,
    order: 2,
  },
  {
    name: "birthDate",
    questionId: 4,
    question: "Date of birth",
    type: "dob",
    description: "",
    default: "",
    required: false,
    group: 1,
    order: 3,
    suborder: 1,
  },
  {
    name: "age",
    questionId: 5,
    question: "Age",
    type: "string",
    description: "",
    default: "",
    required: false,
    group: 1,
    order: 3,
    suborder: 2,
  },
  {
    name: "choseOption",
    questionId: 6,
    question: "Chose from the options",
    type: "radio",
    description: "",
    default: "",
    required: false,
    options: [
      { oId: 1, value: "Yes" },
      { oId: 2, value: "No" },
      { oId: 3, value: "May Be" },
    ],
    group: 1,
    order: 4,
  },
  {
    name: "optionYes",
    questionId: 7,
    question: "Question if Yes",
    type: "string",
    description: "",
    default: "",
    required: false,
    group: 1,
    order: 5,
    primaryId: 6,
    choosenOption: 1,
  },
  {
    name: "optionNo",
    questionId: 8,
    question: "Question if No",
    type: "string",
    description: "",
    default: "",
    required: false,
    group: 1,
    order: 6,
    primaryId: 6,
    choosenOption: 2,
  },
  {
    name: "selectOption",
    questionId: 9,
    question: "Select from the options",
    type: "select",
    description: "",
    default: "",
    required: true,
    options: [
      { oId: 1, value: "Option1" },
      { oId: 2, value: "Option2" },
      { oId: 3, value: "Option3" },
    ],
    group: 1,
    order: 7,
  },
  {
    name: "testmer",
    questionId: 10,
    question: "is benifits?",
    type: "bool",
    description: "",
    default: false,
    required: false,
    group: 1,
    order: 8,
  },
  {
    name: "selectMultiOption",
    questionId: 11,
    question: "Select Multiple from the options",
    type: "multiselect",
    description: "",
    default: [],
    required: false,
    options: [
      { oId: 1, value: "Option1" },
      { oId: 2, value: "Option2" },
      { oId: 3, value: "Option3" },
    ],
    group: 1,
    order: 9,
  },
  {
    name: "testBackgroundItem",
    questionId: 11,
    question: "Test Background item",
    type: "string",
    description: "",
    default: "",
    required: false,
    validations: "email",
    group: 2,
    order: 1,
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
