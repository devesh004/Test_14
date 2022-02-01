import React from "react";
import { Spinner } from "react-bootstrap";

const SmallSpinners = ({ text }) => {
  return (
    <div className='mb-2'>
      <Spinner size='sm' animation='grow' variant='primary' />
      <Spinner size='sm' className='mx-1' animation='grow' variant='warning' />
      <Spinner size='sm' animation='grow' variant='success' />
      <span className='mx-1 text-warning'>{text}</span>
    </div>
  );
};

export default SmallSpinners;
