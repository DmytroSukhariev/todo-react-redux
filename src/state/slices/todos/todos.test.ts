import { validate } from "uuid";
import _ from "lodash/fp";

import { Categories, TodoItem } from "types";

import {
  addNewTodo,
  removeTodo,
  todosReducer,
  toggleDoneTodo,
} from "./todos.slice";
import * as filters from "./filters";
import { selectTodos } from "./todos.selectors";

describe("State", () => {
  describe("Todos", () => {
    it("Should set empty array as initial state", () => {
      const state = todosReducer(
        undefined,
        // @ts-expect-error: invalid action type
        {}
      );

      expect(state).toStrictEqual([]);
    });

    describe("Filters", () => {
      describe("Category filter", () => {
        const todos: Array<TodoItem> = _.flow([
          _.constant([1, 2]),
          _.reduce(
            (state, num) => todosReducer(state, addNewTodo(`TODO_${num}`)),
            undefined as Array<TodoItem> | undefined
          ),
          (state) => {
            const [{ id }] = state;
            return todosReducer(state, toggleDoneTodo(id));
          },
        ])();

        it("Should return all todos while all category selected", () => {
          const selectedTodos = filters.filterByCategory(Categories.ALL)(todos);
          expect(selectedTodos).toStrictEqual(todos);
        });

        it("Should return done todos while done category selected", () => {
          const everySelectedTodoIsDone = _.every(({ isDone }) => isDone)(
            filters.filterByCategory(Categories.DONE)(todos)
          );
          expect(everySelectedTodoIsDone).toStrictEqual(true);
        });

        it("Should return active todos while active category selected", () => {
          const everySelectedTodoIsActive = _.every(({ isDone }) => !isDone)(
            filters.filterByCategory(Categories.ACTIVE)(todos)
          );
          expect(everySelectedTodoIsActive).toStrictEqual(true);
        });
      });

      describe("Search query filter", () => {
        const fQuery = "f";
        const emptyQuery = "";
        const fSeeds = [fQuery.toLowerCase(), fQuery.toUpperCase()];
        const allSeeds = [...fSeeds, "b"];

        const todos: Array<TodoItem> = _.flow([
          _.constant(allSeeds),
          _.reduce(
            (state, num) => todosReducer(state, addNewTodo(`TODO_${num}`)),
            undefined as Array<TodoItem> | undefined
          ),
        ])();

        const todosWithF = _.slice(0, fSeeds.length)(todos);

        it("Should return todos only with f upper and lowercase letter", () => {
          expect(todos).toHaveLength(3);

          const filteredByQueryTodos =
            filters.filterBySearchQuery(fQuery)(todos);

          expect(filteredByQueryTodos).toStrictEqual(todosWithF);
        });

        it("Should return all todos while search query", () => {
          expect(todos).toHaveLength(3);

          const filteredByQueryTodos =
            filters.filterBySearchQuery(emptyQuery)(todos);

          expect(filteredByQueryTodos).toStrictEqual(todos);
        });
      });
    });

    describe("Selectors", () => {
      type MockSecondArityFilter = jest.MockInstance<TodoItem[], [TodoItem[]]>;
      type ActualSecondArityFilter = (todos: TodoItem[]) => TodoItem[];
      let catFilter: MockSecondArityFilter;
      let searchFilter: MockSecondArityFilter;

      const testTodoTitle = "TEST_TITLE";
      const testCategory = Categories.DONE;
      const testSearchQuery = "TEST_SEARCH_QUERY";
      const testTodos = todosReducer(undefined, addNewTodo(testTodoTitle));

      const createTestState = () => ({
        todos: testTodos,
        category: testCategory,
        searchQuery: testSearchQuery,
        isTodoModalVisible: false,
      });

      beforeEach(() => {
        catFilter = jest.fn().mockImplementation(_.identity);
        searchFilter = jest.fn().mockImplementation(_.identity);
        jest
          .spyOn(filters, "filterByCategory")
          .mockReturnValue(catFilter as unknown as ActualSecondArityFilter);
        jest
          .spyOn(filters, "filterBySearchQuery")
          .mockReturnValue(searchFilter as unknown as ActualSecondArityFilter);
      });

      afterAll(() => {
        Object.values(filters).forEach((mockFilter) =>
          (mockFilter as unknown as jest.SpyInstance).mockRestore()
        );
      });

      it("Should return all todos", () => {
        const state = createTestState();

        expect(testTodos).toHaveLength(1);
        expect(selectTodos(state)).toHaveLength(1);
        expect(selectTodos(state)).toStrictEqual(testTodos);
      });

      it("Should call category filter with category from state and todos", () => {
        selectTodos(createTestState());

        expect(filters.filterByCategory).toHaveBeenCalledWith(testCategory);
        expect(catFilter).toHaveBeenCalledWith(testTodos);
      });

      it("Should call searchQuery with searchQuery from state and todos", () => {
        selectTodos(createTestState());

        expect(filters.filterBySearchQuery).toHaveBeenCalledWith(
          testSearchQuery
        );
        expect(searchFilter).toHaveBeenCalledWith(testTodos);
      });
    });

    describe("Slice", () => {
      const mockTimestamp = 777;

      beforeEach(() => {
        jest.spyOn(Date, "now").mockReturnValue(mockTimestamp);
      });

      afterAll(() => {
        (Date.now as unknown as jest.SpyInstance).mockRestore();
      });

      describe("Add new todo", () => {
        it("Should add new todo", () => {
          const title = "TEST_TITLE";
          const [{ title: todoTitle, completedDate, createdDate, isDone, id }] =
            todosReducer(undefined, addNewTodo(title));

          expect(todoTitle).toStrictEqual(title);
          expect(createdDate).toStrictEqual(mockTimestamp);
          expect(completedDate).toStrictEqual(undefined);
          expect(isDone).toStrictEqual(false);
          expect(validate(id)).toStrictEqual(true);
        });

        it("Should not add todo because title is undefined", () => {
          const title = undefined;
          const state = todosReducer(
            undefined,
            addNewTodo(
              // @ts-expect-error: title could not be undefined
              title
            )
          );

          expect(state).toHaveLength(0);
        });

        it("Should not add todo because title is null", () => {
          const title = null;
          const state = todosReducer(
            undefined,
            addNewTodo(
              // @ts-expect-error: title could not be null
              title
            )
          );

          expect(state).toHaveLength(0);
        });
      });

      describe("Remove todo", () => {
        it("Should remove todo with provided id", () => {
          const title = "TEST_TITLE";

          const stateAfterAddingFirstTodo = todosReducer(
            undefined,
            addNewTodo(title)
          );

          expect(stateAfterAddingFirstTodo).toHaveLength(1);

          const [{ id: firstId }] = stateAfterAddingFirstTodo;
          const stateAfterAddingSecondTodo = todosReducer(
            stateAfterAddingFirstTodo,
            addNewTodo(title)
          );

          expect(stateAfterAddingSecondTodo).toHaveLength(2);

          const [, { id: secondId }] = stateAfterAddingSecondTodo;
          const stateAfterRemovingFirstTodo = todosReducer(
            stateAfterAddingSecondTodo,
            removeTodo(firstId)
          );

          expect(stateAfterRemovingFirstTodo).toHaveLength(1);

          const [{ id: lonelyId }] = stateAfterRemovingFirstTodo;

          expect(lonelyId).toStrictEqual(secondId);
        });

        it("Should not change state if id was invalid", () => {
          const title = "TEST_TITLE";

          const stateAfterAddingFirstTodo = todosReducer(
            undefined,
            addNewTodo(title)
          );

          expect(stateAfterAddingFirstTodo).toHaveLength(1);

          const stateAfterAddingSecondTodo = todosReducer(
            stateAfterAddingFirstTodo,
            addNewTodo(title)
          );

          expect(stateAfterAddingSecondTodo).toHaveLength(2);

          const stateAfterRemovingInvalidTodo = todosReducer(
            stateAfterAddingSecondTodo,
            removeTodo("some invalid id")
          );

          expect(stateAfterRemovingInvalidTodo).toHaveLength(2);
        });
      });

      describe("Toggle done", () => {
        it("Should not change state when id was invalid", () => {
          const title = "TEST_TITLE";

          const initialState = todosReducer(undefined, addNewTodo(title));

          const [{ id: todoId, isDone: isDoneBeforeToggle }] = initialState;

          const [{ isDone: isDoneAfterToggle }] = todosReducer(
            initialState,
            toggleDoneTodo(`${todoId} salt`)
          );

          expect(isDoneAfterToggle).toStrictEqual(isDoneBeforeToggle);
        });

        it("Should set todo as done while it was active", () => {
          const title = "TEST_TITLE";

          const initialState = todosReducer(undefined, addNewTodo(title));

          const [{ id: todoId, isDone: isDoneBeforeToggle }] = initialState;

          expect(isDoneBeforeToggle).toStrictEqual(false);

          const [{ isDone: isDoneAfterToggle }] = todosReducer(
            initialState,
            toggleDoneTodo(todoId)
          );

          expect(isDoneAfterToggle).toStrictEqual(true);
        });

        it("Should set todo as active while it was undone", () => {
          const title = "TEST_TITLE";

          const initialState = todosReducer(undefined, addNewTodo(title));

          const [{ id: todoId }] = initialState;

          const stateWithToggledTodo = todosReducer(
            initialState,
            toggleDoneTodo(todoId)
          );

          const [{ isDone: doneIsDone }] = stateWithToggledTodo;

          expect(doneIsDone).toStrictEqual(true);

          const [{ isDone: activeIsDone }] = todosReducer(
            stateWithToggledTodo,
            toggleDoneTodo(todoId)
          );

          expect(activeIsDone).toStrictEqual(false);
        });

        it("Should set completion date as now while todo set as done", () => {
          const title = "TEST_TITLE";

          const initialState = todosReducer(undefined, addNewTodo(title));

          const [{ id: todoId }] = initialState;

          const [{ completedDate }] = todosReducer(
            initialState,
            toggleDoneTodo(todoId)
          );

          expect(completedDate).toStrictEqual(mockTimestamp);
        });

        it("Should delete completionDate while todo set active", () => {
          const title = "TEST_TITLE";

          const initialState = todosReducer(undefined, addNewTodo(title));

          const [{ id: todoId }] = initialState;

          const stateWithDoneTodo = todosReducer(
            initialState,
            toggleDoneTodo(todoId)
          );

          const [{ completedDate: completedDateAfterDone }] = stateWithDoneTodo;

          expect(completedDateAfterDone).toBeDefined();

          const [{ completedDate: completedDateAfterUndone }] = todosReducer(
            stateWithDoneTodo,
            toggleDoneTodo(todoId)
          );

          expect(completedDateAfterUndone).toBeUndefined();
        });
      });
    });
  });
});
