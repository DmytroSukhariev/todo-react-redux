import { State } from "state/common/types";

import { selectIsTodoModalVisible } from "./isTodoMidalVisible.selectors";
import {
  isTodoModalVisibleReducer,
  showTodoModal,
  hideTodoModal,
} from "./isTodoMidalVisible.slice";

describe("State - isTodoModalVisible", () => {
  describe("Selector", () => {
    it("Should select correct state", () => {
      const isVisible = true;
      const state = { isTodoModalVisible: isVisible } as State;

      const selectResult = selectIsTodoModalVisible(state);

      expect(selectResult).toStrictEqual(isVisible);
    });
  });

  describe("Slice", () => {
    it("Should set initial state as false", () => {
      const newState = isTodoModalVisibleReducer(
        undefined,
        // @ts-expect-error: invalid action type
        {}
      );

      expect(newState).toStrictEqual(false);
    });

    describe("Show todo modal", () => {
      it("Should set state as true while old state was false", () => {
        const oldState = false;

        const newState = isTodoModalVisibleReducer(oldState, showTodoModal());

        expect(oldState).toStrictEqual(false);
        expect(newState).toStrictEqual(true);
      });

      it("Should set state as true even if old state was true", () => {
        const oldState = true;

        const newState = isTodoModalVisibleReducer(oldState, showTodoModal());

        expect(oldState).toStrictEqual(true);
        expect(newState).toStrictEqual(true);
      });
    });

    describe("Hide todo modal", () => {
      it("Should set state as false while old state was true", () => {
        const oldState = true;

        const newState = isTodoModalVisibleReducer(oldState, hideTodoModal());

        expect(oldState).toStrictEqual(true);
        expect(newState).toStrictEqual(false);
      });

      it("SHould set state as false even if old state was false", () => {
        const oldState = false;

        const newState = isTodoModalVisibleReducer(oldState, hideTodoModal());

        expect(oldState).toStrictEqual(false);
        expect(newState).toStrictEqual(false);
      });
    });
  });
});
