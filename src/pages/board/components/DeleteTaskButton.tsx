import React from 'react';
import { Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

function DeleteTaskButton(handleToggleModal: () => void): JSX.Element {
  return (
    <Button
      className="task__delete-btn"
      onClick={handleToggleModal}
      variant="outlined"
      color="error"
      endIcon={<DeleteIcon />}
    ></Button>
  );
}

export default DeleteTaskButton;
