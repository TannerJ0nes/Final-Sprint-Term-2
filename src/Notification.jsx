import React, { useEffect, useState } from 'react';

const Notification = ({ message, type, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose(); // Call handleClose after the timeout
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`notification ${show ? 'show' : ''} ${type}`}>
      <p>{message}</p>
      {onClose && <button onClick={handleClose}>&times;</button>}
    </div>
  );
};

export default Notification;
