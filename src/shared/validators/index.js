/* eslint-disable */

const Email = (string) => {
  let regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(string) ? Promise.resolve() : Promise.reject();
};

const PhoneNumber = (string) => {
  let regex = new RegExp(/^[0-9\b\+\-\(\)]+$/);
  return regex.test(string) ? Promise.resolve() : Promise.reject();
}

const Password = (string) => {
  let regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/);
  return regex.test(string) ? Promise.resolve() : Promise.reject();
}
  

const Validators = {
  Email,
  PhoneNumber,
  Password,
};

export default Validators;
