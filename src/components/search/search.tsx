import React, { useState } from "react";
import { Icon, Input, InputGroup } from "rsuite";
import { useSelector } from "react-redux";
import _ from "lodash/fp";

import {
  useDispatch,
  setSearchQuery,
  clearSearchQuery,
  selectSearchQuery,
} from "state";

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);

  const [_searchQuery, _setSearchQuery] = useState<string>(searchQuery);

  const handleInput: (inputValue: string) => void = _.flow([
    _.over([_.flow([setSearchQuery, dispatch]), _setSearchQuery]),
    _.noop,
  ]);

  const handleClear: () => void = _.flow([
    _.noop,
    _.over([_.flow([clearSearchQuery, dispatch]), _setSearchQuery]),
    _.noop,
  ]);

  return (
    <InputGroup style={{ width: "60%" }}>
      <Input
        onChange={handleInput}
        placeholder={"Search"}
        value={_searchQuery}
      />
      <InputGroup.Button onClick={handleClear}>
        <Icon icon={"times-circle"} />
      </InputGroup.Button>
    </InputGroup>
  );
};
