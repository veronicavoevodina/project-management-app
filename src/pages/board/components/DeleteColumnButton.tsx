import React from 'react';
import { Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

function DeleteColumnButton(handleToggleModal: () => void): JSX.Element {
  const { t } = useTranslation();
  return (
    <Button
      className="column__delete-btn"
      onClick={handleToggleModal}
      variant="outlined"
      color="error"
      sx={{ marginBottom: '10px' }}
      endIcon={<DeleteIcon />}
    >
      {t('board.deleteColumn')}
    </Button>
  );
}

export default DeleteColumnButton;
