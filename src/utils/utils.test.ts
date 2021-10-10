import _ from "lodash/fp";
import { log, cutStringIfNeeded } from "./";

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

  describe("cutStringIfNeeded", () => {
    const cutLength = 15;
    const threeDots = "...";
    const shortUpper = "Short_str";
    const shortLower = "short_str";
    const longUpper =
      "Super long title with first uppercased letter and lowercased others";

    it("Should return empty string if input not provided", () => {
      const result = cutStringIfNeeded();

      expect(result).toStrictEqual("");
    });

    describe("First letter", () => {
      it("Should become uppercased if it was in lowercase initially", () => {
        const [firstLetter] = shortLower;
        const [firstLetterProcessed] = cutStringIfNeeded(shortLower);

        expect(firstLetterProcessed).not.toStrictEqual(firstLetter);
      });

      it("Should be without changes if it was in uppercase initially", () => {
        const [firstLetter] = shortUpper;
        const [firstLetterProcessed] = cutStringIfNeeded(shortUpper);

        expect(firstLetterProcessed).toStrictEqual(firstLetter);
      });

      it("Should left other letters without changes if it shorter", () => {
        const [, ...otherLetters] = shortUpper;
        const [, ...otherLettersProcessed] = cutStringIfNeeded(shortUpper);

        expect(shortUpper.length).toBeLessThan(cutLength);
        expect(otherLetters).toStrictEqual(otherLettersProcessed);
      });
    });

    describe("Cutting", () => {
      it("Should left short string without changes", () => {
        expect(cutStringIfNeeded(shortUpper)).toStrictEqual(shortUpper);
      });

      it("Should cut long string and add three dots in the end", () => {
        const cutLongUpper = cutStringIfNeeded(longUpper);

        expect(longUpper).not.toContain(threeDots);
        expect(cutLongUpper).not.toStrictEqual(longUpper);
        expect(
          _.startsWith(cutLongUpper.replace(threeDots, ""))(longUpper)
        ).toStrictEqual(true);
        expect(_.endsWith(threeDots)(cutLongUpper)).toStrictEqual(true);
      });
    });
  });
});
