import _ from "lodash/fp";
import { shallow } from "enzyme";
import { List } from "rsuite";
import { useSelector } from "react-redux";

import { selectTodos } from "state";
import { TodoItem } from "types";

import { TodoItemComponent } from "components/todo-item";

import { TodoList } from "./todo-list";

jest.mock("react-redux");
jest.mock("state");

describe("<TodoList />", () => {
  const mockTodos: Array<TodoItem> = [
    {
      id: "1",
      title: "1",
      createdDate: 1,
      isDone: false,
    },
  ];

  beforeEach(() => {
    // @ts-expect-error: this is mock
    selectTodos.mockReturnValue(mockTodos);
    // @ts-expect-error: this is mock
    useSelector.mockImplementation((f: (state: unknown) => state) => f());
  });

  it("Should render <List />", () => {
    const lists = shallow(<TodoList />).find(List);

    expect(lists).toHaveLength(1);
  });

  it("Should render one <List.Item /> in <List />", () => {
    const listItems = shallow(<TodoList />)
      .find(List)
      .find(List.Item);

    expect(listItems).toHaveLength(1);
  });

  it("Should render one <TodoItemComponent /> with mock todoItem in prop todoItem", () => {
    const listItemProp = shallow(<TodoList />)
      .find(List)
      .find(List.Item)
      .find(TodoItemComponent);

    expect(listItemProp.get(0).props).toHaveProperty("todoItem");
    expect(listItemProp.get(0).props.todoItem).toStrictEqual(mockTodos[0]);
  });
});
