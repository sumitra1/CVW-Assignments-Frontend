
import { useReducer } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { formReducer, initialState } from "../reducer/formReducer";

function MultiStepForm() {
  const [state, dispatch] = useReducer(
    formReducer,
    initialState
  );

  const { step, formData, errors, isSubmitted } = state;

  if (isSubmitted) {
  return (
    <div>
      <h2>Form Submitted Successfully 🎉</h2>

      <pre>
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
}

  return (
    <div>
      <h2>Step {step}</h2>

      {step === 1 && (
        <Step1
          formData={formData}
          errors={errors}
          dispatch={dispatch}
        />
      )}

      {step === 2 && (
        <Step2
          formData={formData}
          errors={errors}
          dispatch={dispatch}
        />
      )}

      {step === 3 && (
        <Step3
          formData={formData}
          errors={errors}
          dispatch={dispatch}
        />
      )}

      <br />

      {step > 1 && (
        <button
          onClick={() =>
            dispatch({ type: "PREVIOUS" })
          }
        >
          Previous
        </button>
      )}

      {step < 3 ? (
        <button
          onClick={() =>
            dispatch({ type: "NEXT" })
          }
        >
          Next
        </button>
      ) : (
        <button
          onClick={() =>
            dispatch({ type: "SUBMIT" })
          }
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default MultiStepForm;