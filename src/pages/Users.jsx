import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import CustomSnack from '../components/CustomSnack';

const Users = () => {
  const [showSnack, setShowSnack] = useState(false);

  return (
    <>
      <Button onClick={() => setShowSnack(true)}>Show Notification</Button>

      <CustomSnack
        open={showSnack}
        onClose={() => setShowSnack(false)}
        title="Hello"
        message="This is a sticky message until user closes it."
        type="error"
        hideTime={5000}
        sticky={true}
      />
    </>
  );
};

export default Users;
