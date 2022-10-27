export function validator(data, config) {
  const errors = {};

  function validate(validateMethod, data, config) {
    let statusWrongValidate = false;
    switch (validateMethod) {
      case "isRequired":
        statusWrongValidate = data.trim() === "";
        break;
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusWrongValidate = !emailRegExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const capitalRegExp = /[A-Z]+/g;
        statusWrongValidate = !capitalRegExp.test(data);
        break;
      }
      case "isContainDigit": {
        const digitRegExp = /\d+/g;
        statusWrongValidate = !digitRegExp.test(data);
        break;
      }
      case "min":
        statusWrongValidate = data.length < config.value;
        break;
      default:
        break;
    }
    if (statusWrongValidate) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) errors[fieldName] = error;
    }
  }

  return errors;
}
