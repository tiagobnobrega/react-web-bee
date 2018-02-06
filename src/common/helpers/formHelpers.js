export const handleChangeValue = fnCallback => e => {
  const { target: { value } } = e;
  fnCallback(value);
};
