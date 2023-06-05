import { noop } from "../../utils/functions"
import { classNames } from "../../utils/dom"

interface HeaderProps {
  /**
   * The content of the Header
   */
  text: string

  /**
   * Relative size of the Header
   */
  size?: "small" | "medium" | "large"

  /**
   * Action to take on click
   */
  onClick?: () => void
}

/**
 * Should be used as a header for UI sections
 */
const Header = ({ text, size = "medium", onClick }: HeaderProps) => {
  return (
    <h1
      className={classNames(
        size === "small"
          ? "text-xl"
          : size === "medium"
          ? "text-2xl"
          : size === "large"
          ? "text-3xl"
          : "text-2xl",
        "text-content",
      )}
      onClick={onClick ?? noop}
    >
      {text}
    </h1>
  )
}

export default Header
