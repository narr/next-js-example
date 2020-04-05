import React from 'react';
import { makeStyles } from '@material-ui/styles';
import MuModal, { ModalProps as MuiModalProps } from '@material-ui/core/Modal';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const styles = {
  root: {},
  backdrop: {
    backgroundColor: 'rgba(64, 30, 23, 0.9)',
  },
  container: {
    display: 'flex',
    height: '100%',
  },
  leftContent: {
    width: '70%',
    'flex-shrink': 0,
    padding: '10px 0 0 10px',
    color: '#fff',
  },
  rightContent: {
    background: '#aac4b4',
    height: '100%',
    overflow: 'auto',
  },
};
export const useStyles = makeStyles(styles, { name: 'Modal' });

type ModalProps = {
  modalProps: Omit<MuiModalProps, 'children'>;
  closeButtonProps?: IconButtonProps;
};

export const Modal = (props: Omit<ModalProps, 'children'>) => {
  const { modalProps, closeButtonProps = {} } = props;
  const classes = useStyles(props);
  return (
    <MuModal
      className={classes.root}
      BackdropProps={{ style: styles.backdrop, className: classes.backdrop }}
      disablePortal
      {...modalProps}
    >
      <div className={classes.container}>
        <div className={classes.leftContent}>
          <IconButton
            aria-label="close"
            color={'inherit'}
            onClick={closeButtonProps.onClick}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.rightContent}>
          {[...new Array(50)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </div>
      </div>
    </MuModal>
  );
};
