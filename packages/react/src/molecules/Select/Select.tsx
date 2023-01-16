import React, {
  createRef,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronBottom, Checked } from "@gxsys/icons";
import Text from "../../atoms/Text";
interface SelectOption {
  label: string;
  value: string | number;
}
interface RenderOptionProps {
  ref: React.RefObject<HTMLLIElement>;
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}

enum KEYS {
  ENTER = "Enter",
  SPACE = " ",
  DOWN_ARROW = "ArrowDown",
  ESC = "Esc",
  UP_ARROW = "ArrowUp",
}

interface SelectProps {
  options?: SelectOption[];
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  label?: string;
  chevronProps?: React.SVGProps<SVGSVGElement>;
  chevronClassName?: string;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const getNextOptionIndex = (
  currentIndex: number | null,
  options: SelectOption[]
) => {
  if (currentIndex === null) {
    return 0;
  }
  if (currentIndex === options.length - 1) {
    return 0;
  }

  return currentIndex + 1;
};

const getPreviousOptionIndex = (
  currentIndex: number | null,
  options: SelectOption[]
) => {
  if (currentIndex === null) {
    return 0;
  }
  if (currentIndex === 0) {
    return options.length - 1;
  }

  return currentIndex - 1;
};

const Select: React.FunctionComponent<SelectProps> = ({
  options = [],
  label = "Select an option ...",
  onOptionSelected: handler,
  chevronProps,
  chevronClassName = "",
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [overlayTop, setOverlayTop] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const labelRef = useRef<HTMLButtonElement>(null);
  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([]);

  const className = `gxs-select`;

  let selectedOption: SelectOption | null = null;

  if (selectedIndex !== null) {
    selectedOption = options[selectedIndex];
  }

  const highlightOption = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  };

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    if (handler) {
      handler(option, optionIndex);
    }

    setSelectedIndex(optionIndex);
    setIsOpen(false);
  };

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  };

  const onOptionKeyDown: KeyboardEventHandler = (event) => {
    if (event.key === KEYS.ESC) {
      setIsOpen(false);

      return;
    }

    if (event.key === KEYS.DOWN_ARROW) {
      highlightOption(getNextOptionIndex(highlightedIndex, options));
    }
    if (event.key === KEYS.UP_ARROW) {
      highlightOption(getPreviousOptionIndex(highlightedIndex, options));
    }
    if (event.key === KEYS.ENTER) {
      onOptionSelected(options[highlightedIndex!], highlightedIndex!);
    }
  };

  const onButtonKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault();

    const checkedKeys: string[] = [KEYS.ENTER, KEYS.DOWN_ARROW, KEYS.SPACE];

    if (checkedKeys.includes(event.key)) {
      setIsOpen(true);

      highlightOption(0);
    }
  };

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  useEffect(() => {
    setOptionRefs(options.map((_) => createRef<HTMLLIElement>()));
  }, [options?.length]);

  useEffect(() => {
    if (isOpen && highlightedIndex !== null) {
      const optionRef = optionRefs[highlightedIndex];
      if (optionRef?.current) {
        optionRef.current.focus();
      }
    }
  }, [isOpen, highlightedIndex]);

  return (
    <div className={className}>
      <button
        ref={labelRef}
        onClick={onLabelClick}
        onKeyDown={onButtonKeyDown}
        className={`${className}__label`}
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        aria-controls="gxsys-select-list"
        data-testid="GxsSelectButton"
      >
        <Text>{selectedIndex ? selectedOption?.label : label}</Text>
        <span
          className={`${className}__chevron ${
            isOpen
              ? `${className}__chevron--open`
              : `${className}__chevron--close`
          } ${chevronClassName || ""}`}
        >
          <ChevronBottom {...chevronProps} />
        </span>
      </button>
      {isOpen ? (
        <ul
          id="gxsys-select-list"
          role="menu"
          aria-hidden={isOpen ? undefined : false}
          style={{ top: overlayTop }}
          className={`${className}__overlay`}
        >
          {options.map((option, optionIndex) => {
            const isSelected = optionIndex === selectedIndex;
            const isHighlighted = optionIndex === highlightedIndex;

            const ref = optionRefs[optionIndex];

            const renderOptionProps: RenderOptionProps = {
              ref,
              option,
              isSelected,
              getOptionRecommendedProps: (overrideProps?: {}) => {
                return {
                  ref,
                  tabIndex: isHighlighted ? -1 : 0,
                  "aria-checked": isSelected ? true : undefined,
                  role: "menuitemradio",
                  "aria-label": option.label,
                  onKeyDown: onOptionKeyDown,
                  onMouseEnter: () => highlightOption(optionIndex),
                  onMouseLeave: () => highlightOption(null),
                  className: `${className}__option ${
                    isSelected ? `${className}__option--selected` : ""
                  } ${
                    isHighlighted ? `${className}__option--highlighted` : ""
                  }`,
                  onClick: () => onOptionSelected(option, optionIndex),
                  key: `${option.label}_${optionIndex}`,
                  ...overrideProps,
                };
              },
            };

            if (renderOption) {
              return renderOption(renderOptionProps);
            }

            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
                <Text>{option.label}</Text>
                {isSelected ? (
                  <span className={`${className}__checked`}>
                    <Checked />
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Select;
