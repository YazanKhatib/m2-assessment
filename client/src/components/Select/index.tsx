import React from "react";

export interface DropdownProps {
  defaultValue?: string;
  options: { value: string; label?: string }[];
  classNames?: string;
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  defaultValue,
  options,
  onChange,
  classNames,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [option, setOption] = React.useState(defaultValue);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSelect = (value: string) => {
    setOption(value);
    setIsOpen(false);
    onChange(value);
  };

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const selectedOption = options.find((o) => o.value === option);

  return (
    <div ref={dropdownRef} className="relative">
      <h3 onClick={toggleMenu} className={` ${classNames}`}>
        {selectedOption?.label ? (
          <span>{selectedOption?.label}</span>
        ) : (
          <span className="text-gray-500">Select ..</span>
        )}
      </h3>

      <ul
        className={` ${
          isOpen
            ? "shadow-around-sm rounded-md absolute right-2 z-[500] w-40 cursor-pointer bg-white border text-sm"
            : "hidden"
        } `}>
        {options.map((option, index) => (
          <li
            key={index}
            className="hover:text-orange dark:hover:text-orange font-sofia-pro-regular p-2 text-black last:border-0 border-b"
            onClick={() => handleSelect(option.value)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
