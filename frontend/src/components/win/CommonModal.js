import React from 'react';

// material-ui
import { Button, Dialog, DialogContent, Stack } from '@mui/material';

// third-party
import { PopupTransition } from '../@extended/Transitions';
import PropTypes from 'prop-types';

// project import
export default function CommonModal({ id, modalData, open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      keepMounted
      TransitionComponent={PopupTransition}
      aria-labelledby='item-delete-title'
      aria-describedby='item-delete-description'
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems='center' spacing={4.5}>
          {modalData ? React.cloneElement(modalData, { id: id, closeModal: handleClose }) : null}
          <Stack direction='row' spacing={0.5} sx={{ width: 1 }}>
            <Button onClick={() => handleClose()} fullWidth color='secondary' variant='outlined'>
              Close
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

CommonModal.propTypes = {
  id: PropTypes.string,
  modalData: PropTypes.element,
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
