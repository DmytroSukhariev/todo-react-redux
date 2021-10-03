import { State } from "state/common/types";

export const selectIsTodoModalVisible = ({
  isTodoModalVisible,
}: State): State["isTodoModalVisible"] => isTodoModalVisible;
