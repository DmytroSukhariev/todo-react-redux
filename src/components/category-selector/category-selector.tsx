import React from "react";
import { Nav } from "rsuite";

import { Categories } from "types";

export type Props = {
  activeCategory: Categories;
  handleSelectCategory: (category: Categories) => void;
};

const CategoryTitles = {
  [Categories.ALL]: "All",
  [Categories.ACTIVE]: "Active",
  [Categories.DONE]: "Done",
};

export const CategorySelector: React.FC<Props> = ({
  activeCategory,
  handleSelectCategory,
}) => (
  <Nav
    appearance={"subtle"}
    activeKey={activeCategory}
    onSelect={handleSelectCategory}
  >
    {Object.values(Categories).map((cat) => (
      <Nav.Item eventKey={cat}>{CategoryTitles[cat]}</Nav.Item>
    ))}
  </Nav>
);
