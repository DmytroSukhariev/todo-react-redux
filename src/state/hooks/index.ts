import { useDispatch as uD } from "react-redux";

// eslint-disable-next-line
export const useDispatch = () => uD<import("state/store").AppDispatch>();
