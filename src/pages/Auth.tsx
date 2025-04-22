import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';

import styles from "./Auth.module.css"

export default function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/trains');
    }
  }, [navigate]);

  return <div className={styles.container}>
    <h1>Rail Flow</h1>
    <AuthForm/>
  </div>
}