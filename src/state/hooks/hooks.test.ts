import { useDispatch as uD } from "react-redux";

import { useDispatch } from "./";

jest.mock("react-redux");

describe("State hooks", () => {
  describe("useDispatch", () => {
    const useDispatchReturnValue = { foo: "bar" } as const;

    const useDispatchMock = uD as unknown as jest.MockInstance<
      typeof useDispatchReturnValue,
      []
    >;

    beforeEach(() => {
      useDispatchMock.mockReturnValue(useDispatchReturnValue);
    });

    it("should call react-redux", () => {
      useDispatch();
      expect(useDispatchMock).toHaveBeenCalled();
    });

    it("should return useDispatchReturnValue", () => {
      const useDispatchResult = useDispatch();
      expect(useDispatchResult).toStrictEqual(useDispatchReturnValue);
    });
  });
});
