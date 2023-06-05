import type { Meta, StoryObj } from "@storybook/react"
import { Header } from "../../components/typography"

const meta = {
  title: "Example/Header",
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    text: "Section Header",
    size: "large",
  },
}

export const Medium: Story = {
  args: {
    text: "Section Header",
  },
}

export const Small: Story = {
  args: {
    text: "Section Header",
    size: "small",
  },
}

export const Event: Story = {
  args: {
    text: "Click Me",
    onClick: () => alert("You clicked me!"),
  },
}
