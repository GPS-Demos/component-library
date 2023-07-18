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

export const SampleForm: Story = {}

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
