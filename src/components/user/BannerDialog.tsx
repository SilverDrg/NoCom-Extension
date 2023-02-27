import React from 'react';
import { Button, Dialog, DialogContent, Grid } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';
import { ColorModeContext } from '../session/ThemeContextProvider';
import { TokenContext } from '../session/TokenContextProvider';
import { apiPostBanner } from '../../util/apiCalls';

import PlaceHolder from '../../images/FileUploadBanner.png';

type BannerDialogProps = {
  open: boolean;
  onClose: () => void;
  onCloseApply: () => void;
};

export const BannerDialog = (props: BannerDialogProps) => {
  const { open, onClose, onCloseApply } = props;
  const [image, setImage] = React.useState<string | File>(PlaceHolder);
  const [scale, setScale] = React.useState(1);
  const [disableDropzone, setDisableDropzone] = React.useState(false);
  const bannerRef = React.useRef<AvatarEditor | null>(null);
  const { mode } = React.useContext(ColorModeContext);
  const { token } = React.useContext(TokenContext);
  const bannerColor = mode === 'light' ? [0, 0, 0, 0.2] : [256, 256, 256, 0.5];
  const bannerBackgroundColor = mode === 'light' ? 'rgb(0, 0, 0, 0.2)' : 'rgb(256, 256, 256, 0.4)';

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

  const applyBanner = React.useCallback(() => {
    if (typeof image === 'string') return;
    bannerRef.current?.getImageScaledToCanvas().toBlob(
      blob => {
        if (!blob) return;
        const imageForm = new FormData();
        imageForm.append('image', blob);
        imageForm.append('name', image.name);

        apiPostBanner(token, imageForm);
      },
      'image/jpeg',
      0.95,
    );
    onCloseApply();
  }, [image, onCloseApply, token]);

  return (
    <Dialog open={open} onClose={onClose} onWheel={handleScroll} PaperProps={{ sx: { margin: 1 } }}>
      <DialogContent sx={{ px: 2, py: 2 }}>
        <div {...getRootProps()}>
          <AvatarEditor
            ref={bannerRef}
            width={320}
            height={128}
            image={image}
            border={1}
            borderRadius={0}
            color={bannerColor}
            backgroundColor={bannerBackgroundColor}
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
            <Button variant="contained" color={mode === 'light' ? 'primary' : 'secondary'} onClick={applyBanner}>
              Apply
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
