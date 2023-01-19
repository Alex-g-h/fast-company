function generateAuthError(message) {
  switch (message) {
    case "INVALID_PASSWORD":
      return "Invalid e-mail or password";
    case "EMAIL_NOT_FOUND":
      return "Invalid e-mail or password";
    case "EMAIL_EXISTS":
      return "User with this e-mail already exists";
    case "USER_DISABLED":
      return "User disabled by administrator";
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      return "Too many attempts. Try again later.";
    case "OPERATION_NOT_ALLOWED":
      return "Sign in is not allowed by administrator";
    default:
      return "Unknown error occurred";
  }
}

export default generateAuthError;
