import React, { useReducer } from "react";

const initialState = {
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

function validate(step, formData) {
  const errors = {};

  if (step === 1) {
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
  }

  if (step === 2) {
    if (!formData.email) errors.email = "Email is required";
    if (!formData.age) errors.age = "Age is required";
  }

  if (step === 3) {
    if (!formData.city) errors.city = "City is required";
  }

  return errors;
}

function reducer(state, action) {
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

      if (Object.keys(errors).length > 0) {
        return {
          ...state,
          errors,
        };
      }

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

      if (Object.keys(errors).length > 0) {
        return {
          ...state,
          errors,
        };
      }

      return {
        ...state,
        isSubmitted: true,
        errors: {},
      };
    }

    default:
      return state;
  }
}

export default function SingleFile() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { step, formData, errors, isSubmitted } = state;

  if (isSubmitted) {
    return (
      <div>
        <h2>Form Submitted Successfully!</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Step {step}</h2>

      {step === 1 && (
        <>
          <input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "firstName",
                value: e.target.value,
              })
            }
          />
          <p>{errors.firstName}</p>

          <input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "lastName",
                value: e.target.value,
              })
            }
          />
          <p>{errors.lastName}</p>
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "email",
                value: e.target.value,
              })
            }
          />
          <p>{errors.email}</p>

          <input
            placeholder="Age"
            value={formData.age}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "age",
                value: e.target.value,
              })
            }
          />
          <p>{errors.age}</p>
        </>
      )}

      {step === 3 && (
        <>
          <input
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "city",
                value: e.target.value,
              })
            }
          />
          <p>{errors.city}</p>
        </>
      )}

      <br />
      <br />

      {step > 1 && (
        <button onClick={() => dispatch({ type: "PREVIOUS" })}>
          Previous
        </button>
      )}

      {step < 3 ? (
        <button onClick={() => dispatch({ type: "NEXT" })}>
          Next
        </button>
      ) : (
        <button onClick={() => dispatch({ type: "SUBMIT" })}>
          Submit
        </button>
      )}
    </div>
  );
}