import type { SpinnerProps } from "../types";

const Spinner = ({
  size = "small",
  thickness = 10,
  center = false,
}: SpinnerProps) => {
  const getStyle = (size: string) => {
    switch (size) {
      case "small":
        return {
          borderWidth: thickness,
          margin: center ? "auto" : "0",
          width: "100px",
          height: "100px",
        };
      case "medium":
        return {
          borderWidth: thickness,
          margin: center ? "auto" : "0",
          width: "150px",
          height: "150px",
        };

      case "large":
        return {
          borderWidth: thickness,
          margin: center ? "auto" : "0",
          width: "200px",
          height: "200px",
        };
    }
  };

  const spinnerStyle = getStyle(size);

  return <div className="spinner" style={spinnerStyle}></div>;
};
export default Spinner;
