function Step2({ formData, errors, dispatch }) {
  return (
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
  );
}

export default Step2;