export const getDragStyle = ({
  isDragging,
  withOpacity,
  style,
  disabledShadow = false,
}) => {
  let boxShadow = "";
  if (!disabledShadow) {
    boxShadow = isDragging
      ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
      : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px";
  }

  const inlineStyles = {
    opacity: withOpacity ? "0.5" : "1",
    transformOrigin: "50% 50%",
    cursor: isDragging ? "grabbing" : "grab",
    boxShadow,
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    ...style,
  };
  return inlineStyles;
};
