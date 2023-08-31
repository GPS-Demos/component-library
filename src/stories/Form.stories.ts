import type { Meta, StoryObj } from "@storybook/react"
//import { within, userEvent } from "@storybook/testing-library"

import { Form } from "./Form"

const meta = {
  title: "Form",
  component: Form,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Sample: Story = {
  args: {
    formType: "sample",
    title: "All",
    information: "Information",
    benefitsAvailable: "Benefits Available",
    benefitsDescription:
      "Click the arrow to see the benifits that you can avail based on the information provided",
  },
}

export const Text: Story = {
  args: {
    formType: "string",
    title: "Text",
  },
}

export const NumberText: Story = {
  args: {
    formType: "number",
    title: "Number Text",
  },
}

export const Select: Story = {
  args: {
    formType: "select",
    title: "Select",
  },
}

export const MultiSelect: Story = {
  args: {
    formType: "multiselect",
    title: "Multi Select",
  },
}

export const Boolean: Story = {
  args: {
    formType: "bool",
    title: "Boolean",
  },
}

export const Radio: Story = {
  args: {
    formType: "radio",
    title: "Radio",
  },
}

export const ButtonGroup: Story = {
  args: {
    formType: "buttongroup",
    title: "Button Group",
  },
}

export const SelectGroup: Story = {
  args: {
    formType: "selectgroup",
    title: "Select Group",
  },
}

export const Date: Story = {
  args: {
    formType: "dob",
    title: "Date",
  },
}

export const FileUpload: Story = {
  args: {
    formType: "file",
    title: "File Upload",
  },
}

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
// export const LoggedIn: Story = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement)
//     const loginButton = await canvas.getByRole("button", {
//       name: /Log in/i,
//     })
//     await userEvent.click(loginButton)
//   },
// }
