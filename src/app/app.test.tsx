import { shallow } from "enzyme";

import { Todo } from "pages/todo";

import { App } from "./app";

describe("<App />", () => {
  describe("Render", () => {
    it("Should render <div /> with App class name", () => {
      const app = shallow(<App />).find("div.App");
      expect(app).toHaveLength(1);
    });

    it("<Todo /> page component", () => {
      const todo = shallow(<App />).find(Todo);
      expect(todo).toHaveLength(1);
    });
  });
});
