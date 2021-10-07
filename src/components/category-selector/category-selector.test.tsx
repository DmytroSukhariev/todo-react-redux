import _ from "lodash/fp";
import { mount, shallow } from "enzyme";
import { Nav } from "rsuite";
import { useSelector } from "react-redux";

import { selectCategory, setCategory, useDispatch } from "state";
import { Categories } from "types";

import { CategorySelector } from "./category-selector";

jest.mock("state");
jest.mock("react-redux");

describe("<CategorySelector />", () => {
  const setCategoryReturnValue = { type: "TEST_TYPE" };
  const dispatchMock = jest.fn();
  const useSelectorMock = useSelector as unknown as jest.MockInstance<
    string,
    [() => string]
  >;
  const useDispatchMock = useDispatch as unknown as jest.MockInstance<
    typeof dispatchMock,
    [typeof setCategoryReturnValue]
  >;
  const setCategoryMock = setCategory as unknown as jest.MockInstance<
    typeof setCategoryReturnValue,
    [string]
  >;
  const selectCategoryMock = selectCategory as unknown as jest.MockInstance<
    string,
    []
  >;

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatchMock);
    setCategoryMock.mockReturnValue(setCategoryReturnValue);
    useSelectorMock.mockImplementation((f: () => string) => f());
  });

  describe("Render", () => {
    it("Should render <Nav />", () => {
      const nav = shallow(<CategorySelector />).find(Nav);

      expect(nav).toHaveLength(1);
    });

    it("Should render <Nav /> with active category", () => {
      const category = "TEST_CATEGORY";

      selectCategoryMock.mockReturnValue(category);

      const { activeKey } = shallow(<CategorySelector />)
        .find(Nav)
        .props();

      expect(activeKey).toStrictEqual(category);
    });

    it("Should render <Nav.Item /> with categories", () => {
      const navItems = shallow(<CategorySelector />).find(Nav.Item);

      expect(navItems).toHaveLength(Object.values(Categories).length);
    });

    describe("Should render <Nav.Item /> with each category", () => {
      Object.values(Categories).forEach((category) => {
        it(category, () => {
          const categoryNavItem = shallow(<CategorySelector />)
            .find(Nav.Item)
            .find({ eventKey: category });

          expect(categoryNavItem).toHaveLength(1);
        });
      });
    });
  });

  describe("Set category", () => {
    describe("Should call setCategory with each category", () => {
      Object.values(Categories).forEach((category) => {
        it(category, () => {
          mount(<CategorySelector />)
            .find(Nav.Item)
            .find({ eventKey: category })
            .find("a")
            .simulate("click");

          expect(setCategoryMock).toHaveBeenCalledWith(category);
        });
      });
    });

    it("Should call dispatch with setCategoryReturnValue", () => {
      const category = Categories.DONE;
      const { onSelect } = shallow(<CategorySelector />)
        .find(Nav)
        .props();

      expect(_.isFunction(onSelect)).toStrictEqual(true);

      // @ts-expect-error: onSelect is a function and needs only one arg
      onSelect(category);

      expect(dispatchMock).toHaveBeenCalledWith(setCategoryReturnValue);
    });
  });
});
