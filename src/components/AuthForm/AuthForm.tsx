import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../Button/Button";
import Input from "../Input/Input";

import { api } from "../../api";

import styles from "./AuthForm.module.css"

export default function AuthForm() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const navigate = useNavigate();

      const auth = async () => {
    try {
        const res = await api(
            `/auth/${isLoginMode ? "login" : "register"}`,
            'POST',
            {
              email: emailRef.current.value,
              password: passwordRef.current.value
            }
          );
        localStorage.setItem('token', res.token);
      navigate('/trains');
    } catch {
      alert('Login failed');
    }
  };

  function handleLogin() {
    auth();
  }

    function handleModeChange() {
        setIsLoginMode(prev => !prev);
    }

    return <section className={styles["auth-section"]}>
        <div>
            <Input ref={emailRef} type='email' label='Email' id="email" placeholder='Enter your email...'/>
            <Input ref={passwordRef} type="password" label='Password' id="password" placeholder='**********'/>
        </div>
        <div>
            <Button onClick={handleLogin} isPrimary={true}>{isLoginMode ? "Login" : "Register"}</Button>
            <Button onClick = {handleModeChange} >Switch to {isLoginMode ? "register" : "login"}</Button>
        </div>
    </section>
}