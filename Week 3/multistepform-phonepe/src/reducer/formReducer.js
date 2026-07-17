import { validate } from "../utils/validation";

export const initialState = {
  step: 1,
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    city: "",
  },
  errors: {},
  isSubmitted: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };

    case "NEXT": {
      const errors = validate(state.step, state.formData);

      if (Object.keys(errors).length)
        return { ...state, errors };

      return {
        ...state,
        step: state.step + 1,
        errors: {},
      };
    }

    case "PREVIOUS":
      return {
        ...state,
        step: state.step - 1,
      };

    case "SUBMIT": {
      const errors = validate(state.step, state.formData);

      if (Object.keys(errors).length)
        return { ...state, errors };

      return {
        ...state,
        isSubmitted: true,
      };
    }

    default:
      return state;
  }
}