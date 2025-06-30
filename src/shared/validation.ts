function validateInput(input: string | undefined) {
  let message = null;
  if (input === undefined || input.length === 0) {
    message = 'Поле не может быть пустым.';
  }
  return message;
}
export { validateInput };
