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
  },
}

export const Text: Story = {
  args: {
    formType: "string",
    title: "Text",
  },
}

export const Select: Story = {
  args: {
    formType: "select",
    title: "Select",
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
