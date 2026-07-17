function Step1({ formData, errors, dispatch }) {
  return (
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
  );
}

export default Step1;