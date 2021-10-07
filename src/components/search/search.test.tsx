import * as AllFromReact from "react";
import { shallow, mount } from "enzyme";
import { useSelector } from "react-redux";
import { Input, InputGroup, Icon } from "rsuite";

import {
  useDispatch,
  setSearchQuery,
  clearSearchQuery,
  selectSearchQuery,
} from "state";

import { Search } from "./search";

jest.mock("state");
jest.mock("react-redux");

describe("<Search />", () => {
  const defaultTestQuery = "TEST_QUERY";
  const setSearchQueryReturnValue = { type: "TEST_SET_SEARCH_QUERY" };
  const clearSearchQueryReturnValue = { type: "TEST_CLEAR_SEARCH_QUERY" };

  const reactSetSearchQueryMock = jest.fn();
  const dispatchMock = jest.fn();
  const useDispatchMock = useDispatch as unknown as jest.MockInstance<
    typeof dispatchMock,
    [typeof setSearchQueryReturnValue | typeof clearSearchQueryReturnValue]
  >;
  const selectSearchQueryMock =
    selectSearchQuery as unknown as jest.MockInstance<string, []>;
  const useSelectorMock = useSelector as unknown as jest.MockInstance<
    string,
    [() => string]
  >;
  const setSearchQueryMock = setSearchQuery as unknown as jest.MockInstance<
    typeof setSearchQueryReturnValue,
    [string]
  >;
  const clearSearchQueryMock = clearSearchQuery as unknown as jest.MockInstance<
    typeof clearSearchQueryReturnValue,
    []
  >;

  beforeEach(() => {
    jest.spyOn(AllFromReact, "useState").mockImplementation(
      // @ts-expect-error: mock implementation incorrectly infers types
      (initialState: string) =>
        [initialState, reactSetSearchQueryMock] as [
          string,
          typeof reactSetSearchQueryMock
        ]
    );
    selectSearchQueryMock.mockReturnValue(defaultTestQuery);
    useSelectorMock.mockImplementation((f: () => string) => f());
    useDispatchMock.mockReturnValue(dispatchMock);
    setSearchQueryMock.mockReturnValue(setSearchQueryReturnValue);
    clearSearchQueryMock.mockReturnValue(clearSearchQueryReturnValue);
  });

  describe("Render", () => {
    it("Should render input", () => {
      const input = shallow(<Search />).find(Input);

      expect(input).toHaveLength(1);
    });

    it("Should render input with search query value", () => {
      const inputValue = shallow(<Search />)
        .find(Input)
        .props().value;

      expect(inputValue).toStrictEqual(defaultTestQuery);
    });

    describe("Clear button", () => {
      it("Should render clear button", () => {
        const clearButton = shallow(<Search />).find(InputGroup.Button);

        expect(clearButton).toHaveLength(1);
      });

      it("Should render clear icon inside button", () => {
        const clearButtonIcon = shallow(<Search />)
          .find(InputGroup.Button)
          .find(Icon);

        expect(clearButtonIcon).toHaveLength(1);
      });
    });
  });

  describe("Handle search", () => {
    const onInputChangeValue = "ON_INPUT_CHANGE_VALUE";

    const renderAndChange = () =>
      mount(<Search />)
        .find(Input)
        .find(`input[type="text"]`)
        .simulate("change", { target: { value: onInputChangeValue } });

    beforeEach(() => {
      selectSearchQueryMock.mockReturnValue("");
    });

    it("Should call redux setSearchQuery with input value", () => {
      renderAndChange();
      expect(setSearchQueryMock).toHaveBeenCalledWith(onInputChangeValue);
    });

    it("Should call dispatch with redux setSearchQueryReturnValue", () => {
      renderAndChange();
      expect(dispatchMock).toHaveBeenCalledWith(setSearchQueryReturnValue);
    });

    it("Should call react setSearchQuery with input value", () => {
      renderAndChange();
      expect(reactSetSearchQueryMock).toHaveBeenCalledWith(onInputChangeValue);
    });
  });

  describe("Handle clear", () => {
    const renderAndClear = () =>
      mount(<Search />)
        .find(InputGroup.Button)
        .find(`a`)
        .simulate("click");

    it("Should call redux clearSearchQuery", () => {
      renderAndClear();
      expect(clearSearchQueryMock).toBeCalledTimes(1);
    });

    it("Should dispatch with clearSearchQueryReturnValue", () => {
      renderAndClear();
      expect(dispatchMock).toHaveBeenCalledWith(clearSearchQueryReturnValue);
    });

    it("Should call react setSearchQuery with empty string", () => {
      renderAndClear();
      expect(reactSetSearchQueryMock).toHaveBeenCalledWith("");
    });
  });
});
