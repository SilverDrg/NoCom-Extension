import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { GeneralTooltip } from './GeneralTooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type BackButtonProps = {
  btnSize?: 'small' | 'medium' | 'large';
  fontSize?: 'small' | 'medium' | 'large';
  absolute?: boolean;
};

export const BackButton = (props: BackButtonProps) => {
  const { btnSize = 'medium', fontSize = 'medium', absolute = false } = props;
  const navigate = useNavigate();

  const absoluteProps = {
    position: 'absolute',
    left: 10,
    top: 70,
  };

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <GeneralTooltip title="Back">
      <Button
        sx={{
          width: 42,
          minWidth: 36,
          ...(absolute && absoluteProps),
        }}
        variant="contained"
        onClick={handleReturn}
        color="secondary"
        size={btnSize}
      >
        <ArrowBackIcon color="primary" fontSize={fontSize} />
      </Button>
    </GeneralTooltip>
  );
};
