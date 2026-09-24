import { INDIAN_STATES, IndiaState } from "./states";

export const getStateCode = (state: IndiaState["name"]) => {
  return INDIAN_STATES.find((s: IndiaState) => s.name === state)?.code;
};
