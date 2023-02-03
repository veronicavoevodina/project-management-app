import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DeleteModal = (props: {
  message: string;
  submit: () => void;
  deleteButton: (handleToggleModal: () => void) => JSX.Element;
}): JSX.Element => {
  const { t } = useTranslation();
  const [openDeleteMessage, setOpenDeleteMessage] = useState<boolean>(false);
  const handleToggleModal = () => {
    setOpenDeleteMessage((openDeleteMessage) => !openDeleteMessage);
  };
  return (
    <>
      {props.deleteButton(handleToggleModal)}
      <Dialog open={openDeleteMessage} onClose={handleToggleModal}>
        <DialogTitle>{props.message}</DialogTitle>
        <DialogActions>
          <Button
            sx={{ color: 'black' }}
            onClick={() => {
              props.submit();
              handleToggleModal();
            }}
          >
            {t('deleteModal.yes')}
          </Button>
          <Button sx={{ color: 'black' }} onClick={handleToggleModal}>
            {t('deleteModal.no')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
