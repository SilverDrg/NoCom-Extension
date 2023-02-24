import React from 'react';
import { Button, Dialog, DialogContent, Grid } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';
import { ColorModeContext } from '../session/ThemeContextProvider';
import { TokenContext } from '../session/TokenContextProvider';
import { apiPostAvatar } from '../../util/apiCalls';

import PlaceHolder from '../../images/FileUpload.png';

type AvatarDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const AvatarDialog = (props: AvatarDialogProps) => {
  const { open, onClose } = props;
  const [image, setImage] = React.useState<string | File>(PlaceHolder);
  const [scale, setScale] = React.useState(1);
  const [disableDropzone, setDisableDropzone] = React.useState(false);
  const avatarRef = React.useRef<AvatarEditor | null>(null);
  const { mode } = React.useContext(ColorModeContext);
  const { token } = React.useContext(TokenContext);
  const avatarColor = mode === 'light' ? [0, 0, 0, 0.2] : [256, 256, 256, 0.5];
  const avatarBackgroundColor = mode === 'light' ? 'rgb(0, 0, 0, 0.2)' : 'rgb(256, 256, 256, 0.4)';

  const handleDrop = (dropped: any) => {
    setImage(dropped[0]);
    setDisableDropzone(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: handleDrop,
    disabled: disableDropzone,
  });

  const handleScroll = (event: any) => {
    if (!disableDropzone) return;
    setScale(value => clampValue(value + ((event as WheelEvent).deltaY > 0 ? 0.05 : -0.05), 1, 2));
  };

  const clampValue = (val: number, min: number, max: number) => {
    return Math.min(Math.max(val, min), max);
  };

  const applyAvatar = React.useCallback(() => {
    if (typeof image === 'string') return;
    avatarRef.current?.getImageScaledToCanvas().toBlob(
      blob => {
        if (!blob) return;
        const imageForm = new FormData();
        imageForm.append('image', blob);
        imageForm.append('name', image.name);

        apiPostAvatar(token, imageForm);
      },
      'image/jpeg',
      0.95,
    );
  }, [image, token]);

  return (
    <Dialog open={open} onClose={onClose} onWheel={handleScroll}>
      <DialogContent>
        <div {...getRootProps()}>
          <AvatarEditor
            ref={avatarRef}
            width={192}
            height={192}
            image={image}
            border={1}
            borderRadius={96}
            color={avatarColor}
            backgroundColor={avatarBackgroundColor}
            scale={scale}
          />
          <input {...getInputProps()} />
        </div>
        <Grid container justifyContent="space-between" sx={{ pt: 2 }}>
          <Grid item>
            <Button variant="text" color="error" onClick={onClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color={mode === 'light' ? 'primary' : 'secondary'} onClick={applyAvatar}>
              Apply
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
