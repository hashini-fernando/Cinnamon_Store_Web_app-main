import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Title from '../../Components/Title/Title';
import classes from './register.module.css';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const auth = useAuth();

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const user = await auth.register(data);
    if (user) {
      auth.setUser(user); 
      navigate(returnUrl || '/OurProducts');
    }
  };

  return (
    <div className={classes.body12}>
      <div className={classes.details}>
        <Title title="Register" />
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            type="text"
            label="Name"
            {...register('name', {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />

          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: 'Email is not valid',
              },
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true,
              minLength: 5,
            })}
            error={errors.password}
          />

          <Input
            type="password"
            label="Confirm Password"
            {...register('confirmPassword', {
              required: true,
              validate: (value) =>
                value !== getValues('password') ? 'Passwords Do Not Match' : true,
            })}
            error={errors.confirmPassword}
          />

          <Input
            type="text"
            label="Address"
            {...register('address', {
              required: true,
              minLength: 10,
            })}
            error={errors.address}
          />

          <Button type="submit" text="Register" />

          <div className={classes.login}>
            Already a user? &nbsp;
            <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
