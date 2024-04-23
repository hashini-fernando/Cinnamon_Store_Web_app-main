



import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Title from '../../Components/Title/Title';
import classes from './payment.module.css';

export default function Payment() {
  
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm();

  const submit = async (data) => {
   

  
    navigate('/orders');
  };

  return (
    <div className={classes.body2}>
      <div className={classes.details}>
        <Title title="Payment Details" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Card Name"
            {...register('cardname', {
              required: true,
              minLength: 13,
            })}
            error={errors.cardname}
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
            type="date"
            label="Expiry Date"
            {...register('expiryDate', {
              required: true,
              minLength: 5,
            })}
            error={errors.expiryDate}
          />

          <Input
            type="text"
            label="CVV"
            {...register('cvv', {
              required: true,
            })}
            error={errors.cvv}
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

          <Button type="submit" text="Pay" />
        </form>
      </div>
    </div>
  );
}
