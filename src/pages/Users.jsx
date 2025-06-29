import React, { useState } from 'react';
import CustomLoader from '../components/CustomLoader';
import Button from '@mui/joy/Button';

const Users = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000); // show loader for 3 seconds
  };

  return (
    <>
      {loading && <CustomLoader />}
      <Button onClick={handleClick}>Show Loader</Button>
    </>
  );
};

export default Users;
