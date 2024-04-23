import React from 'react'

export default function Price({price,locate,currency}) {

    const formatPrice = () =>
    new Intl.NumberFormat ( locate,{
        style: 'currency',
        currency,
    }).format(price);

   
  return (
    <span>{formatPrice()}</span>
  )
}

Price.defaultProps = {
    locate: 'en-lk',
    currency : 'LKR',
};


