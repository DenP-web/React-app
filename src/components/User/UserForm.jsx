import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleForm, toggleFormType } from "../../features/user/userSlice";

import styles from "./User.module.css";

import UserSignUpForm from "./UserSignUpForm";
import UserLoginForm from "./UserLoginForm ";

export default function UserForm() {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector(({ user }) => user);

  const closeForm = () => dispatch(toggleForm(false));;
  const toggleCurrenFormType = (type) => dispatch(toggleFormType(type));;

  return (
    showForm && (
      <>
        <div className={styles.overlay} onClick={closeForm} />
        {formType === "signup" ? (
          <UserSignUpForm toggleCurrenFormType={toggleCurrenFormType} closeForm={closeForm} />
        ) : (
          <UserLoginForm toggleCurrenFormType={toggleCurrenFormType} closeForm={closeForm} />
        )}
      </>
    )
  );
}
