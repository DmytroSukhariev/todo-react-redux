import _ from "lodash/fp";
import { shallow } from "enzyme";

import { useDispatch, showTodoModal } from "state";

import { CategorySelector } from "components/category-selector";
import { AddTodoModal } from "components/add-todo-modal";

import { ControlPanel } from "./control-panel";

jest.mock("state");

describe("<ControlPannel />", () => {
  const showTodoModalReturnValue = { type: "TEST_TYPE" };
  const dispatchMock = jest.fn();
  const useDispatchMock = useDispatch as unknown as jest.MockInstance<
    typeof dispatchMock,
    [typeof showTodoModalReturnValue]
  >;
  const showTodoModalMock = showTodoModal as unknown as jest.MockInstance<
    typeof showTodoModalReturnValue,
    []
  >;

  beforeEach(() => {
    showTodoModalMock.mockReturnValue(showTodoModalReturnValue);
    useDispatchMock.mockReturnValue(dispatchMock);
  });

  describe("Render", () => {
    it("Should render <button /> with on click prop and 'Add new' text", () => {
      const button = shallow(<ControlPanel />).find("button");

      expect(button).toHaveLength(1);
      expect(button.text()).toStrictEqual("Add new");
      expect(_.isFunction(button.props().onClick)).toStrictEqual(true);
    });

    it("Should render <CategorySelector />", () => {
      const categorySelector = shallow(<ControlPanel />).find(CategorySelector);

      expect(categorySelector).toHaveLength(1);
    });

    it("Should render <AddTodoModal />", () => {
      const addTodoModal = shallow(<ControlPanel />).find(AddTodoModal);

      expect(addTodoModal).toHaveLength(1);
    });
  });

  describe("Show modal", () => {
    it("Should call dispatch mock with showTodoModalReturnValue on button click", () => {
      const button = shallow(<ControlPanel />).find("button");

      button.simulate("click");

      expect(dispatchMock).toHaveBeenCalledWith(showTodoModalReturnValue);
    });
  });
});
