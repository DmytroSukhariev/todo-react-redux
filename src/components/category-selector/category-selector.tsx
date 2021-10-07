import React from "react";
import { Nav } from "rsuite";
import _ from "lodash/fp";
import { useSelector } from "react-redux";

import { selectCategory, setCategory, useDispatch } from "state";
import { log } from "utils";

import { Categories } from "types";

const CategoryTitles = {
  [Categories.ALL]: "All",
  [Categories.ACTIVE]: "Active",
  [Categories.DONE]: "Done",
};

export const CategorySelector: React.FC = () => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  const handleSelectCategory = _.flow([setCategory, dispatch]);

  return (
    <Nav
      appearance={"subtle"}
      activeKey={category}
      onSelect={handleSelectCategory}
    >
      {Object.values(Categories).map((cat) => (
        <Nav.Item eventKey={cat} key={cat}>
          {CategoryTitles[cat]}
        </Nav.Item>
      ))}
    </Nav>
  );
};
