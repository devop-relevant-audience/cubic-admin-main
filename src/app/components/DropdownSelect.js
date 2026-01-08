import { Component, useState } from "react";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
// import { hexColors } from "../../lib/constants";
import { cn } from "@/lib/utils";
import { formatNumber } from "../utils/general.util";

const height = 35;
class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

const DropdownAddress = ({
  label = "",
  options = [],
  value,
  setValue = null,
  sideFunction = null,
  placeholder = "โปรดระบุ",
  disable = false,
  isSearchable = false,
  isClearable = false,
  zIndex = null,
  className = "",
  error = false,
}) => {
  const [searchKey, setSearchKey] = useState("");

  const handleChange = (value) => {
    if (!setValue) return;
    setValue(value);
    if (sideFunction) sideFunction(value);
  };

  let optionProps = {};

  if (disable) {
    optionProps = {
      menuIsOpen: false,
    };
  }

  if (zIndex) {
    optionProps.className = "z-" + zIndex;
  }

  return (
    <div className={cn("w-48 relative", className)}>
      <div
        className={cn(
          "flex w-full h-full transition-all duration-500",
          label
            ? "select-none pointer-events-none absolute left-0 font-normal transition-all -top-1.5 before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:rounded-tl-[7px] before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:rounded-tr-[7px] after:pointer-events-none after:transition-all peer-disabled:after:border-transparent text-[11px] peer-disabled:text-transparent before:border-t before:border-l after:border-t after:border-r leading-tight text-gray-600 before:border-blue-gray-200 after:border-blue-gray-200"
            : "hidden",
          error && "text-red-500 before:border-red-500 after:border-red-500"
        )}
      >
        {label}
      </div>
      <div
        className={cn(
          " focus:outline-none select-none nofocus transition-all duration-500 bg-transparent border border-blue-gray-200 rounded-[7px]",
          label && "border-t-0",
          error && "border-red-500"
        )}
      >
        <Select
          {...optionProps}
          components={{
            IndicatorSeparator: () => null,
            MenuList,
            SingleValue: ({ children, ...props }) => (
              <div {...props} className="text-base text-gray-800 font-semibold">
                {children.split(" ")[3]}
              </div>
            ),
          }}
          isSearchable={isSearchable}
          inputValue={searchKey}
          onInputChange={(val) => {
            const value = formatNumber(val);
            setSearchKey(value);
          }}
          value={value}
          onChange={(e) => handleChange(e)}
          options={options}
          styles={{
            menu: (base) => ({
              ...base,
              fontSize: 18,
            }),
            control: (base) => ({
              ...base,
              minHeight: 38,
              fontSize: 14,
              //   color: hexColors.placeholder,
              color: "#424242",
              border: 0,
              backgroundColor: "transparent",
              outline: "none",
              boxShadow: "none",
            }),
          }}
          placeholder={placeholder}
          theme={(theme) => ({
            ...theme,
            borderRadius: 7,
            colors: {
              ...theme.colors,
              //   primary25: hexColors.ddPrimary25,
              //   primary: hexColors.ddPrimary,
            },
          })}
          isClearable={isClearable}
        />
      </div>
    </div>
  );
};

export default DropdownAddress;
