import React, { useState } from "react";
import { Icon, Input, InputGroup } from "rsuite";

export type Props = {
  handleSearch: (searchQuery: string) => void;
};

export const Search: React.FC<Props> = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInput = (inputValue: string) => {
    setSearchQuery(inputValue);
    handleSearch(inputValue);
  };

  const handleClear = () => {
    setSearchQuery("");
    handleSearch("");
  };

  return (
    <InputGroup style={{ width: "60%" }}>
      <Input
        onChange={handleInput}
        placeholder={"Search"}
        value={searchQuery}
      />
      <InputGroup.Button onClick={handleClear}>
        <Icon icon={"times-circle"} />
      </InputGroup.Button>
    </InputGroup>
  );
};
