import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Title from '../../Components/Title/Title';
import classes from './loginPage.module.css';
import Input from '../../Components/Input/Input';

import Button from '../../Components/Button/Button';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    await login(data.email, data.password);
    if (user) {
      if (user.isAdmin===true) {
        navigate(returnUrl || '/users');
      } else {
        navigate(returnUrl || '/OurProducts');
      }
    }
  };

  return (
    <div className={classes.body1}>
      <div className={classes.container}>
        <div className={classes.details}>
          <Title title="Login" />
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
                  type="email"
                  label="Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                      message: 'Email is not valid',
                    },
                  })}
                  error={errors.email}
                  autoComplete="off" 
                />

                <Input
                  type="password"
                  label="Password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  error={errors.password}
                  autoComplete="off" 
                />

            <Button type="submit" text="Login" />

            <div className={classes.register}>
              New user? &nbsp;
              <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
