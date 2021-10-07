import { log } from "./";

describe("Utils", () => {
  describe("log", () => {
    const testValues = [
      { value: true, title: "boolean -> true" },
      { value: false, title: "boolean -> false" },
      { value: 1, title: "number -> 1" },
      { value: 2, title: "number -> 2" },
      { value: "foo", title: "string -> foo" },
      { value: "bar", title: "string -> bar" },
      { value: { foo: "bar" }, title: 'object -> { foo: "bar" }' },
      { value: [1, 2, 3], title: "object -> [1, 2, 3]" },
      { value: undefined, title: "undefined -> self" },
      { value: null, title: "null -> self" },
      { value: Symbol("foo"), title: 'symbol -> Symbol("foo")' },
      { value: () => "", title: 'function -> () => ""' },
    ];

    let consoleSpy: jest.SpyInstance<void, [...unknown[]]>;
    beforeEach(() => {
      consoleSpy = jest.spyOn(console, "log");
    });

    describe("Should return each received value", () => {
      testValues.forEach(({ value, title }) => {
        it(title, () => {
          expect(log(value)).toStrictEqual(value);
        });
      });
    });

    describe("Should call console.log with each value", () => {
      testValues.forEach(({ value, title }) => {
        it(title, () => {
          log(value);
          expect(consoleSpy).toHaveBeenCalledWith(value);
        });
      });
    });
  });
});
