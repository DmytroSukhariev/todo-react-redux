import _ from "lodash/fp";
import { mount, shallow } from "enzyme";
import * as AllFromReact from "react";
import { useSelector } from "react-redux";
import { Alert, Modal, Input, Button } from "rsuite";

import {
  useDispatch,
  addNewTodo,
  selectIsTodoModalVisible,
  hideTodoModal,
} from "state";
import { cutStringIfNeeded } from "utils";

import { AddTodoModal } from "./add-todo-modal";

jest.mock("react-redux");
jest.mock("state");
jest.mock("utils");

describe("<AddTodoModal />", () => {
  const hideTodoModalActionMock = { type: "HIDE_MODAL_MOCK" } as const;
  const addNewTodoActionMock = { type: "ADD_NEW_TODO_MOCK" } as const;
  const defaultIsTodoModalVisible = true;
  const defaultTestTitle = "TEST_TITLE";

  type MockActions =
    | typeof hideTodoModalActionMock
    | typeof addNewTodoActionMock;

  const dispatchMock: jest.MockInstance<void, [MockActions]> = jest.fn();
  const useDispatchMock = useDispatch as unknown as jest.MockInstance<
    typeof dispatchMock,
    []
  >;
  const selectIsTodoModalVisibleMock =
    selectIsTodoModalVisible as unknown as jest.MockInstance<boolean, []>;

  type MockSelectors = typeof selectIsTodoModalVisibleMock;

  const useSelectorMock = useSelector as unknown as jest.MockInstance<
    boolean,
    [MockSelectors]
  >;

  let alertSuccessSpy: jest.SpyInstance<void, [string]>;
  let alertErrorSpy: jest.SpyInstance<void, [string]>;
  const setTitleMock: jest.MockInstance<void, [string]> = jest.fn();
  let useStateSpy: jest.SpyInstance<
    [string | null, typeof setTitleMock],
    [null]
  >;
  const hideTodoModalMock = hideTodoModal as unknown as jest.MockInstance<
    typeof hideTodoModalActionMock,
    []
  >;
  const addNewTodoMock = addNewTodo as unknown as jest.MockInstance<
    typeof addNewTodoActionMock,
    [string]
  >;
  const cutStringIfNeededMock =
    cutStringIfNeeded as unknown as jest.MockInstance<string, [string]>;

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatchMock);
    selectIsTodoModalVisibleMock.mockReturnValue(defaultIsTodoModalVisible);
    useSelectorMock.mockImplementation(
      // @ts-expect-error: invalid type
      (f: () => boolean) => f()
    );
    alertSuccessSpy = jest.spyOn(Alert, "success") as jest.SpyInstance<
      void,
      [string]
    >;
    alertErrorSpy = jest.spyOn(Alert, "error") as jest.SpyInstance<
      void,
      [string]
    >;
    // @ts-expect-error: invalid useState inference
    useStateSpy = jest
      .spyOn(AllFromReact, "useState")
      // @ts-expect-error: invalid setTitle inference
      .mockReturnValue([defaultTestTitle, setTitleMock]);

    addNewTodoMock.mockReturnValue(addNewTodoActionMock);
    hideTodoModalMock.mockReturnValue(hideTodoModalActionMock);
    cutStringIfNeededMock.mockImplementation(_.identity);
  });

  describe("Render", () => {
    describe("<Modal />", () => {
      it("Should render rsuit <Modal />", () => {
        const modal = shallow(<AddTodoModal />).find(Modal);
        expect(modal).toHaveLength(1);
      });

      describe("Rsuit <Modal /> should have value from selectIsTodoModalVisible", () => {
        [true, false].forEach((isVisible) => {
          it(`${isVisible}`, () => {
            selectIsTodoModalVisibleMock.mockReturnValue(isVisible);
            const { show } = shallow(<AddTodoModal />)
              .find(Modal)
              .props();
            expect(show).toStrictEqual(isVisible);
          });
        });
      });

      it("Rsuit <Modal /> should have onHide property as a function", () => {
        const { onHide } = shallow(<AddTodoModal />)
          .find(Modal)
          .props();
        expect(_.isFunction(onHide)).toStrictEqual(true);
      });
    });

    describe("Title", () => {
      it("Should <Modal.Header /> inside <Modal />", () => {
        const modalHeader = shallow(<AddTodoModal />)
          .find(Modal)
          .find(Modal.Header);

        expect(modalHeader).toHaveLength(1);
      });

      it("Should render <Title.Title /> inside <Modal.Header />", () => {
        const title = shallow(<AddTodoModal />)
          .find(Modal.Header)
          .find(Modal.Title);

        expect(title).toHaveLength(1);
      });

      it("<Title /> should have words new and todo inside", () => {
        const titleText = shallow(<AddTodoModal />)
          .find(Modal.Header)
          .find(Modal.Title)
          .text()
          .toLowerCase();

        expect(titleText).toContain("new");
        expect(titleText).toContain("todo");
      });
    });

    describe("Input", () => {
      it("Should render <Modal.Body /> inside <Modal />", () => {
        const modalBody = shallow(<AddTodoModal />).find(Modal.Body);

        expect(modalBody).toHaveLength(1);
      });

      it("Should render <Input /> inside <Modal.Body />", () => {
        const input = shallow(<AddTodoModal />)
          .find(Modal.Body)
          .find(Input);

        expect(input).toHaveLength(1);
      });

      it("Should have one <input /> in <Input />", () => {
        const input = mount(<AddTodoModal />)
          .find(Input)
          .find("input");

        expect(input).toHaveLength(1);
      });

      it("<Input /> should have 'Title' as placeholder", () => {
        const { placeholder } = shallow(<AddTodoModal />)
          .find(Modal.Body)
          .find(Input)
          .props();

        expect(placeholder).toStrictEqual("Title");
      });

      it("<Input /> should have onChange as a function", () => {
        const { onChange } = shallow(<AddTodoModal />)
          .find(Modal.Body)
          .find(Input)
          .props();

        expect(_.isFunction(onChange)).toStrictEqual(true);
      });
    });

    describe("Buttons", () => {
      it("Should render <Modal.Footer />", () => {
        const modalFooter = shallow(<AddTodoModal />).find(Modal.Footer);

        expect(modalFooter).toHaveLength(1);
      });

      it("Should render two <Button /> inside <Modal.Footer />", () => {
        const buttons = shallow(<AddTodoModal />)
          .find(Modal.Footer)
          .find(Button);

        expect(buttons).toHaveLength(2);
      });

      it("onClick in both <Button /> should be a function", () => {
        shallow(<AddTodoModal />)
          .find(Modal.Footer)
          .find(Button)
          .forEach((button) => {
            const { onClick } = button.props();
            expect(_.isFunction(onClick)).toStrictEqual(true);
          });
      });

      describe("Buttons class names", () => {
        ["submit-button", "cancel-button"].forEach((expectedClassName) => {
          it(expectedClassName, () => {
            const button = shallow(<AddTodoModal />)
              .find(Modal.Footer)
              .find(Button)
              .find(`.${expectedClassName}`);

            expect(button).toHaveLength(1);
          });
        });
      });

      describe("Submit", () => {
        it("Should have primary appearance", () => {
          const submitButton = shallow(<AddTodoModal />)
            .find(Modal.Footer)
            .find(Button)
            .find(".submit-button")
            .props();

          expect(
            // @ts-expect-error: we have appearance here
            submitButton.appearance
          ).toStrictEqual("primary");
        });

        it("Should have 'Submit' as title", () => {
          const submitButtonText = shallow(<AddTodoModal />)
            .find(Modal.Footer)
            .find(Button)
            .find(".submit-button")
            .text();

          expect(submitButtonText).toContain("Submit");
        });
      });

      describe("Cancel", () => {
        it("Should have ghost appearance", () => {
          const cancelButton = shallow(<AddTodoModal />)
            .find(Modal.Footer)
            .find(Button)
            .find(".cancel-button")
            .props();

          expect(
            // @ts-expect-error: we have appearance here
            cancelButton.appearance
          ).toStrictEqual("ghost");
        });

        it("Should have 'Cancel' as title", () => {
          const cancelButtonText = shallow(<AddTodoModal />)
            .find(Modal.Footer)
            .find(Button)
            .find(".cancel-button")
            .text();

          expect(cancelButtonText).toContain("Cancel");
        });

        it("Should have red as color", () => {
          const cancelButton = shallow(<AddTodoModal />)
            .find(Modal.Footer)
            .find(Button)
            .find(".cancel-button")
            .props();

          expect(cancelButton.color).toStrictEqual("red");
        });
      });
    });
  });

  describe("Input", () => {
    it("Should call setTitleMock with input value", () => {
      const inputValue = "TEST_INPUT_VALUE";

      mount(<AddTodoModal />)
        .find(Input)
        .find("input")
        .simulate("change", { target: { value: inputValue } });

      expect(setTitleMock.mock.calls[0][0]).toStrictEqual(inputValue);
    });
  });

  describe("Handle hide modal", () => {
    const buttonClick = () =>
      mount(<AddTodoModal />)
        .find(Button)
        .find(".cancel-button")
        .find("button")
        .simulate("click");

    it("Should call hideTodoModalMock on click Cancel button", () => {
      buttonClick();
      expect(hideTodoModalMock).toHaveBeenCalled();
    });

    it("Should call dispatchMock with hideTodoModalActionMock hide on click Cancel button", () => {
      buttonClick();
      expect(dispatchMock).toHaveBeenCalledWith(hideTodoModalActionMock);
    });
  });

  describe("Handle add new todo", () => {
    const buttonClick = () =>
      mount(<AddTodoModal />)
        .find(Button)
        .find(".submit-button")
        .find("button")
        .simulate("click");

    describe("Failure", () => {
      ["", null].forEach((invalidTitle) => {
        const invalidTitleTestTitle =
          invalidTitle === "" ? "empty string" : String(invalidTitle);

        beforeEach(() => {
          useStateSpy.mockReturnValue([invalidTitle, setTitleMock]);
        });

        it(`Should call Alert.error mock while title is ${invalidTitleTestTitle}`, () => {
          buttonClick();
          expect(alertErrorSpy).toHaveBeenCalled();
        });

        it(`Should not call addNewTodo mock while title is ${invalidTitleTestTitle}`, () => {
          buttonClick();
          expect(addNewTodoMock).not.toHaveBeenCalled();
        });

        it(`Should not call Alert.success mock while title is ${invalidTitleTestTitle}`, () => {
          buttonClick();
          expect(alertSuccessSpy).not.toHaveBeenCalled();
        });

        it(`Should not call cutStringIfNeededMock mock while title is ${invalidTitleTestTitle}`, () => {
          buttonClick();
          expect(cutStringIfNeededMock).not.toHaveBeenCalled();
        });

        it(`Should not call hideTodoModal mock while title is ${invalidTitleTestTitle}`, () => {
          buttonClick();
          expect(hideTodoModalMock).not.toHaveBeenCalled();
        });

        it(`Should not call dispatch mock while title is ${invalidTitleTestTitle}`, () => {
          buttonClick();
          expect(dispatchMock).not.toHaveBeenCalled();
        });
      });
    });

    describe("Success", () => {
      it("Alert.error mock should not been called", () => {
        buttonClick();
        expect(alertErrorSpy).not.toHaveBeenCalled();
      });

      it("addNewTodo mock should been called default title", () => {
        buttonClick();
        expect(addNewTodoMock).toHaveBeenCalledWith(defaultTestTitle);
      });

      describe("dispatch", () => {
        it("dispatch mock should been called twice", () => {
          buttonClick();
          expect(dispatchMock).toHaveBeenCalledTimes(2);
        });

        it("dispatch mock firstly should been called with addNewTodoActionMock", () => {
          buttonClick();
          expect(dispatchMock).nthCalledWith(1, addNewTodoActionMock);
        });

        it("dispatch mock secondly should been called with hideTodoModalActionMock", () => {
          buttonClick();
          expect(dispatchMock).nthCalledWith(2, hideTodoModalActionMock);
        });
      });

      it("Alert.success mock should been called", () => {
        buttonClick();
        expect(alertSuccessSpy).toHaveBeenCalled();
      });

      it("cutStringIfNeeded mock should been called with title", () => {
        buttonClick();
        expect(cutStringIfNeededMock).toHaveBeenCalledWith(defaultTestTitle);
      });

      it("hideTodoModal should been called", () => {
        buttonClick();
        expect(hideTodoModalMock).toHaveBeenCalled();
      });
    });
  });
});
