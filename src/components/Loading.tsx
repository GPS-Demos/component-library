import { CSSProperties } from "react"

const outerStyles: CSSProperties = {
  minHeight: "100%",
  minWidth: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const Loading = () => {
  return (
    <div style={outerStyles}>
      <span className="loading loading-spinner text-primary"></span>
    </div>
  )
}

export default Loading
