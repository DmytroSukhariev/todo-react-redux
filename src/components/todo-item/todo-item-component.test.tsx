import { shallow, mount } from "enzyme";
import _ from "lodash/fp";
import moment from "moment";
import { Alert, Checkbox, IconButton } from "rsuite";

import { TodoItem } from "types";

import { useDispatch, removeTodo, toggleDoneTodo } from "state";
import { cutStringIfNeeded } from "utils";

import { TodoItemComponent } from "./todo-item-component";

jest.mock("state");
jest.mock("moment");
jest.mock("utils");

describe("<TodoItemComponent />", () => {
  const createTodoItem = ({
    id = "todo_item_id",
    createdDate = 777,
    isDone = false,
    title = "todo_item_title",
  }: Partial<TodoItem>) => ({ id, createdDate, isDone, title });

  const defaultFormattedDate = "DEFAULT_FORMATTED_DATE";

  const toggleDoneTodoActionMock = {
    type: "TOGGLE_DONE_TODO_ACTION_MOCK ",
  } as const;
  const removeTodoActionMock = { type: "REMOVE_TODO_ACTION_MOCK" } as const;

  type MockAction =
    | typeof toggleDoneTodoActionMock
    | typeof removeTodoActionMock;

  const dispatchMock = jest.fn() as jest.MockInstance<void, [MockAction]>;
  const toggleDoneTodoMock = toggleDoneTodo as unknown as jest.MockInstance<
    typeof toggleDoneTodoActionMock,
    [string]
  >;
  const removeTodoMock = removeTodo as unknown as jest.MockInstance<
    typeof removeTodoActionMock,
    [string]
  >;
  const useDispatchMock = useDispatch as unknown as jest.MockInstance<
    typeof dispatchMock,
    [MockAction]
  >;

  const momentFormatMock = jest.fn() as jest.MockInstance<string, [string]>;
  const momentMock = moment as unknown as jest.MockInstance<
    { format: typeof momentFormatMock },
    [number]
  >;
  const cutStringIfNeededMock =
    cutStringIfNeeded as unknown as jest.MockInstance<string, [string]>;
  const alertSuccessSpy = jest.spyOn(Alert, "success");

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatchMock);
    toggleDoneTodoMock.mockReturnValue(toggleDoneTodoActionMock);
    removeTodoMock.mockReturnValue(removeTodoActionMock);
    momentFormatMock.mockReturnValue(defaultFormattedDate);
    momentMock.mockReturnValue({ format: momentFormatMock });
    cutStringIfNeededMock.mockImplementation(_.identity);
  });

  const shallowRenderDefaultTodoItem = (todoItemProps = {}) =>
    shallow(<TodoItemComponent todoItem={createTodoItem(todoItemProps)} />);

  const mountDefaultTodoItem = (todoItemProps = {}) =>
    mount(<TodoItemComponent todoItem={createTodoItem(todoItemProps)} />);

  describe("Render", () => {
    describe("todo-item", () => {
      it("Should render div with todo-item class", () => {
        const todoItem = shallowRenderDefaultTodoItem().find("div.todo-item");

        expect(todoItem).toHaveLength(1);
      });
    });

    describe("todo-item-is-done-checkbox", () => {
      it("Should render one checkbox with todo-item-is-done-checkbox class", () => {
        const checkbox = shallowRenderDefaultTodoItem().find(
          ".todo-item-is-done-checkbox"
        );

        expect(checkbox).toHaveLength(1);
      });

      describe("Checkbox should have isDone as checked property", () => {
        [true, false].forEach((isDone) => {
          it(String(isDone), () => {
            const { checked } = shallowRenderDefaultTodoItem({ isDone })
              .find(".todo-item-is-done-checkbox")
              .props();

            expect(checked).toStrictEqual(isDone);
          });
        });
      });

      it("Checkbox should have onChange as function", () => {
        const { onChange } = shallowRenderDefaultTodoItem()
          .find(".todo-item-is-done-checkbox")
          .props();

        expect(_.isFunction(onChange)).toStrictEqual(true);
      });
    });

    describe("todo-item-title", () => {
      it("Should render span with todo todo-item-title class", () => {
        const title = shallowRenderDefaultTodoItem().find(".todo-item-title");

        expect(title).toHaveLength(1);
      });

      describe("Span should have title of todo item as content", () => {
        ["foo", "bar", "baz", "fiz"].forEach((title) => {
          it(title, () => {
            const titleText = shallowRenderDefaultTodoItem({ title })
              .find(".todo-item-title")
              .text();

            expect(titleText).toStrictEqual(title);
          });
        });
      });
    });

    describe("todo-item-created-date-time", () => {
      it("Should render span with todo-item-created-date-time class", () => {
        const created = shallowRenderDefaultTodoItem().find(
          ".todo-item-created-date-time"
        );

        expect(created).toHaveLength(1);
      });

      describe("Span should have moment.format mock return value as content", () => {
        ["foo", "bar", "baz", "fiz"].forEach((formattedTime) => {
          it(formattedTime, () => {
            momentFormatMock.mockReturnValue(formattedTime);

            const created = shallowRenderDefaultTodoItem()
              .find(".todo-item-created-date-time")
              .text();

            expect(created).toStrictEqual(formattedTime);
          });
        });
      });
    });

    describe("todo-item-delete", () => {
      it("Should render button with todo-item-delete class", () => {
        const deleteButton =
          shallowRenderDefaultTodoItem().find(".todo-item-delete");

        expect(deleteButton).toStrictEqual(deleteButton);
      });

      it("Button should have onClick as a function", () => {
        const { onClick } = shallowRenderDefaultTodoItem()
          .find(".todo-item-delete")
          .props();

        expect(_.isFunction(onClick)).toStrictEqual(true);
      });
    });
  });

  describe("Handle delete", () => {
    const deleteClick = ({ id = "just_id", title = "just_title" } = {}) =>
      mountDefaultTodoItem({ id, title })
        .find(".todo-item-delete")
        .find("button")
        .simulate("click");

    describe("removeTodo should be called with todoItem id", () => {
      ["foo", "bar", "baz", "fiz"].forEach((id) => {
        it(id, () => {
          deleteClick({ id });
          expect(removeTodoMock).toHaveBeenCalledWith(id);
        });
      });
    });

    it("dispatch should be called with removeTodoActionMock", () => {
      deleteClick();
      expect(dispatchMock).toHaveBeenCalledWith(removeTodoActionMock);
    });

    describe("cutStringIfNeededMock should be called with title", () => {
      ["foo", "bar", "baz", "fiz"].forEach((title) => {
        it(title, () => {
          deleteClick({ title });
          expect(cutStringIfNeededMock).toHaveBeenCalledWith(title);
        });
      });
    });

    it("alertSuccessMock should be called", () => {
      deleteClick();
      expect(alertSuccessSpy).toHaveBeenCalled();
    });
  });

  describe("Toggle done", () => {
    const toggleDoneCLick = ({
      id = "just_id",
      title = "just_title",
      isDone = false,
    } = {}) => {
      mountDefaultTodoItem({ id, title, isDone })
        .find(Checkbox)
        .find('input[type="checkbox"]')
        .simulate("change");
    };

    describe("toggleDoneTodoMock should be called with id", () => {
      ["foo", "bar", "baz", "fiz"].forEach((id) => {
        it(id, () => {
          toggleDoneCLick({ id });
          expect(toggleDoneTodoMock).toHaveBeenCalledWith(id);
        });
      });
    });

    it("dispatch mock should be called with toggleDoneTodoActionMock", () => {
      toggleDoneCLick();
      expect(dispatchMock).toHaveBeenCalledWith(toggleDoneTodoActionMock);
    });

    describe("cutStringIfNeededMock should be colled with title", () => {
      ["foo", "bar", "baz", "fiz"].forEach((title) => {
        it(title, () => {
          toggleDoneCLick({ title });
          expect(cutStringIfNeededMock).toHaveBeenCalledWith(title);
        });
      });
    });

    describe("alert success", () => {
      it("mock should be called", () => {
        toggleDoneCLick();
        expect(alertSuccessSpy).toHaveBeenCalled();
      });

      it("mock call argument should have 'done' if todo ws not done", () => {
        toggleDoneCLick({ isDone: false });
        expect(alertSuccessSpy.mock.calls[0][0]).toContain("done");
      });

      it("mock call argument should have 'active' if todo ws not done", () => {
        toggleDoneCLick({ isDone: true });
        expect(alertSuccessSpy.mock.calls[0][0]).toContain("active");
      });
    });
  });
});
