// components/ChakraDatePicker.tsx
"use client";

import React from "react";
import { Input, InputGroup, Portal } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type ChakraDatePickerProps = {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
};

export const ChakraDatePicker: React.FC<ChakraDatePickerProps> = ({
  selected,
  onChange,
  placeholder = "Select date",
}) => {
  return (
    <InputGroup className="!w-fit">
      <div className="flex">
        <DatePicker
          selected={selected}
          onChange={onChange}
          customInput={
            <Input
              placeholder={placeholder}
              pl="2.5rem"
              cursor="pointer"
              readOnly
            />
          }
          dateFormat="yyyy-MM-dd"
          popperPlacement="top"
        />
      </div>
    </InputGroup>
  );
};
