import { Categories } from "types";
import { State } from "state/common/types";

import { categoryReducer, setCategory } from "./category.slice";
import { selectCategory } from "./category.selectors";

describe("State", () => {
  describe("Category", () => {
    describe("Selectors", () => {
      it("Should select category from state", () => {
        const category = Categories.ALL;

        const state = { category } as State;

        const selectResult = selectCategory(state);

        expect(selectResult).toStrictEqual(category);
      });
    });

    describe("Slice", () => {
      it("Should set initial category as all", () => {
        const initialState = categoryReducer(
          undefined,
          // @ts-expect-error: invalid action
          {}
        );

        expect(initialState).toStrictEqual(Categories.ALL);
      });

      describe("Set category", () => {
        describe("Should set each category", () => {
          Object.values(Categories).forEach((category) => {
            it(category, () => {
              const state = categoryReducer(undefined, setCategory(category));

              expect(state).toStrictEqual(category);
            });
          });
        });
      });
    });
  });
  it("Trying to fail commit hook", () => {
    expect(true).toStrictEqual(false);
  });
});
