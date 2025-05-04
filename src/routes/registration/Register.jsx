import React, { useEffect, useState } from "react";
import validateForm from "../../components/validateForm";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import ResetLocation from "../../helpers/ResetLocation";
import "./register.css";
import InputBtn from "../../components/InputBtn";
import NotFound from "../not-found/NotFound";
const Register = ({ activateLoginModal }) => {
  const [formValue, setFormValue] = useState({
    id: "",
    email: "",
    password: "",
    repeatPassword: "",
    fullname: "",
    address: "",
    number: "",
  });
  const [formError, setFormError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [registrationFail, setRegistrationFail] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_USERS_URL);
      const body = await response.json();

      return body.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const createUser = async (user) => {
    try {
          console.log(user)
        const response = await fetch(import.meta.env.VITE_USERS_URL, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.status === 200) {
          return true;
        } else {
          console.log("Error in createUser");
          return false;
        }
      // }
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setFormError(validate(formValue));
    window.scrollTo(0, 0);
    if (Object.keys(validate(formValue)).length > 0) {
      setLoading(false);
      return;
    } else {
      let currForm = { ...formValue };
      if (currForm.repeatPassword.length > 0) {
        delete currForm.repeatPassword;
      }
      if (currForm.address !== undefined) {
        delete currForm.address;
      }
      if (currForm.number !== undefined) {
        delete currForm.number;
      }
      currForm.email = currForm.email.toLowerCase();
      const accCreation = await createUser(currForm);
      if (accCreation === false) {
        setLoading(false);
        setSubmit(false);
        setRegistrationFail(true);
        setFormValue({
          id: "",
          email: "",
          password: "",
          repeatPassword: "",
          fullname: "",
          address: "",
          number: "",
        });
      } else {
        setLoading(false);
        setRegistrationFail(false);
        setSubmit(true);
        setFormValue({
          id: "",
          email: "",
          password: "",
          repeatPassword: "",
          fullname: "",
          address: "",
          number: "",
        });
      }
    }
  };


  const handleValidation = (e) => {
    console.log(e)
    // const { name, value } = e.target;
    setFormValue({ ...formValue, [e.name]: e.value });
  };


  const validate = validateForm("registration");

  useEffect(() => {
    document.title = "Registration | Pizza Time";
  }, []);


  return (
    <>
    {!localStorage.getItem('validLogin') ? <><NotFound /></>
      :
    <motion.main
      className="register"
      initial={{ opacity: 0, translateX: -300 }}
      whileInView={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -300 }}
      transition={{ duration: 1 }}>
      <h2>
        {submit && Object.keys(formError).length === 0
          ? "Success!"
          : "Registration"}
      </h2>
      {loading ? (
        <div
          role="status"
          className="loader">
          <p>Almost there...</p>
          <img
            alt="Processing request"
            src="https://media0.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e472hf2wk1f2jou3s5fcnx1vek6ggnfcvhsjbeh7v5u&ep=v1_stickers_search&rid=giphy.gif&ct=s"
          />
        </div>
      )
        :
        submit && Object.keys(formError).length === 0
          ?
          (
            <section className="register__success">
              <p>You can now log in and make an order!</p>
              <button
                className="passive-button-style txt-white"
                onClick={() => {
                  ResetLocation();
                  activateLoginModal();
                  setSubmit(false);
                }}>
                Log in
              </button>
            </section>
          )
          :
          (
            <form
              className="register__form"
              onSubmit={handleSubmit}>
              <section className="register__form__field">
                <InputBtn type={'text'} placeholder={'Full Name'} name={'fullname'} value={formValue.fullname} getData={handleValidation} />
                <span className="register__error">{formError.fullname}</span>
              </section>
              <section className="register__form__field">
                <InputBtn type={'text'} placeholder={'Email'} name={'email'} value={formValue.email} getData={handleValidation} />
                <span className="register__error">{formError.email}</span>
              </section>
              <section className="register__form__field">
                <InputBtn type={'password'} placeholder={'New password'} name={'password'} value={formValue.password} getData={handleValidation} />
                <span className="register__error">{formError.password}</span>
                <InputBtn type={'password'} placeholder={'Repeat password'} name={'repeatPassword'} value={formValue.repeatPassword} getData={handleValidation} />
                <span className="register__error">{formError.repeatPassword}</span>
              </section>
              <section className="register__form__field-b">
                <InputBtn type={'text'} placeholder={'Address (optional)'} name={'address'} value={formValue.address} getData={handleValidation} />
                <span className="register__error">{formError.address}</span>
              </section>
              <section className="register__form__field-b">
                <InputBtn type={'text'} placeholder={'Number (optional)'} name={'number'} value={formValue.number} getData={handleValidation} />
                <span className="register__error">{formError.number}</span>
              </section>
              <p className="terms-warning register__form__terms">
                By clicking Sign Up, you agree to our Terms, Data Policy and Cookies
                Policy. You may receive an email notification from us and can opt
                out any time.
              </p>
              <button
                className="register__submit"
                type="submit">
                Sign up
              </button>
            </form>
          )}
    </motion.main>
        }
        </>
  );
};

export default Register;
