function Step3({ formData, errors, dispatch }) {
  return (
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
  );
}

export default Step3;