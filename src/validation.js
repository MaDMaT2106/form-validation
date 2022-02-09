import { setSummitButton } from "./Redux/actions/action";
import { store } from "./index";

export const emailValidation = (event) => {
  const email = event.target.value;
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    store.dispatch(setSummitButton(true));
  } else {
    store.dispatch(setSummitButton(false));
  }
};

export const ageValidation = (event) => {
  const currentDate = new Date().getFullYear();
  const birthDate = new Date(event.target.value).getFullYear();
  currentDate - birthDate >= 18
    ? store.dispatch(setSummitButton(false))
    : store.dispatch(setSummitButton(true));
};

export const passwordValidation = (event) => {
  const password = event.target.value;

  //test for length of password
  password < 8
    ? store.dispatch(setSummitButton(true))
    : store.dispatch(setSummitButton(false));

  //test for uppercase
  /[A-Z]/.test(password)
    ? store.dispatch(setSummitButton(false))
    : store.dispatch(setSummitButton(true));

  //test for including numbers
  /\d/.test(password)
    ? store.dispatch(setSummitButton(false))
    : store.dispatch(setSummitButton(true));

  //   const temp = [...password.split(/\D/)];
  //   const temp2 = temp.filter((char) => char !== "").join("").length;

  // temp2 >= 1 ? dispatch(setSummitButton(false)) : dispatch(setSummitButton(true));
};
// }
