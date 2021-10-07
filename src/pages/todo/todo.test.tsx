import { shallow } from "enzyme";

import { ControlPanel } from "components/control-panel";
import { TodoList } from "components/todo-list";

import { Todo } from "./todo";

describe("<Todo />", () => {
  it("Should render <ControlPannel />", () => {
    const wrapper = shallow(<Todo />);

    expect(wrapper.find(ControlPanel)).toHaveLength(1);
  });

  it("Should render <TodoList />", () => {
    const wrapper = shallow(<Todo />);

    expect(wrapper.children().find(TodoList)).toHaveLength(1);
  });
});
