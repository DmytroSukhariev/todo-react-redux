import { State } from "state/common/types";

import {
  searchQueryReducer,
  clearSearchQuery,
  setSearchQuery,
} from "./searchQuery.slice";
import { selectSearchQuery } from "./searchQuery.selectors";

describe("State", () => {
  describe("Search query", () => {
    describe("Selectors", () => {
      it("Should select search query", () => {
        const searchQuery = "TEST_QUERY";

        const state = { searchQuery } as State;

        const selectResult = selectSearchQuery(state);

        expect(selectResult).toStrictEqual(searchQuery);
      });
    });

    describe("Slice", () => {
      it("Should set empty string as initial state", () => {
        const state = searchQueryReducer(
          undefined,
          // @ts-expect-error: invalid action type
          {}
        );

        expect(state).toStrictEqual("");
      });

      describe("Set search query", () => {
        it("Should set provided search query", () => {
          const searchQuery = "TEST_QUERY";

          const state = searchQueryReducer(
            undefined,
            setSearchQuery(searchQuery)
          );

          expect(state).toStrictEqual(searchQuery);
        });
      });

      describe("Clear search query", () => {
        it("Should set search query as empty string", () => {
          const searchQuery = "TEST_QUERY";

          const stateBeforeClearing = searchQueryReducer(
            undefined,
            setSearchQuery(searchQuery)
          );

          expect(stateBeforeClearing).toStrictEqual(searchQuery);

          const stateAfterClearing = searchQueryReducer(
            stateBeforeClearing,
            clearSearchQuery()
          );

          expect(stateAfterClearing).toStrictEqual("");
        });
      });
    });
  });
});
