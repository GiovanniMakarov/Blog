const validationRules = {
  username: {
    required: "Enter your username",
    minLength: { value: 3, message: "Length should be more then 3 symbols" },
    maxLength: { value: 20, message: "Length should be less then 20 symbols" },
    pattern: {
      value: /^[a-z][a-z0-9]*$/,
      message: "You can only use lowercase English letters and numbers",
    },
  },
  email: {
    required: "Enter your email",
    minLength: { value: 3, message: "Length should be more then 3 symbols" },
    maxLength: { value: 100, message: "Length should be less then 20 symbols" },
    pattern: {
      value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Enter correct email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: { value: 6, message: "Password length should be more then 5 symbols" },
    maxLength: { value: 40, message: "Password length should be less then 40 symbols" },
  },
  passwordConfirmation: {
    required: "Please, confirm password",
    validate: {
      matchesPreviousPassword: (value) => {
        // eslint-disable-next-line no-undef
        const { password } = getValues();
        return password === value || "Passwords should match";
      },
    },
  },
  url: {
    pattern: {
      value: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
      message: "Enter correct url",
    },
  },
  body: {
    required: "Enter article text",
    maxLength: { value: 5000, message: "Too long text, max 5000 symbols" },
  },
  title: {
    required: "Enter article title",
    maxLength: { value: 100, message: "Too long title, max 100 symbols" },
  },
  description: {
    required: "Enter article description",
    maxLength: { value: 300, message: "Too long description, max 300 symbols" },
  },
  tag: {
    required: "Enter tag",
    maxLength: { value: 30, message: "Too long tag, max 30 symbols" },
  },
};

export default validationRules;
