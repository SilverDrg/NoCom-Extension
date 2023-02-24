import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ColorModeContext } from '../session/ThemeContextProvider';
import { useLoggedIn } from '../../hooks/useLoggedIn';

type CommentsFilterProps = {
  sortByFilter: 'new' | 'old' | 'top';
  displaySortBy: boolean;
  nsfwFilter: boolean;
  setSortByFilter: (value: 'new' | 'old' | 'top') => void;
  setNsfwFilter: (value: boolean) => void;
};

export const CommentFilters = (props: CommentsFilterProps) => {
  const { sortByFilter, displaySortBy, nsfwFilter, setSortByFilter, setNsfwFilter } = props;
  const { mode } = React.useContext(ColorModeContext);
  const isLoggedIn = useLoggedIn();
  const theme = useTheme();

  const handleSortByChange = (event: SelectChangeEvent) => {
    setSortByFilter(event.target.value as 'new' | 'old' | 'top');
  };

  const handleNsfwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNsfwFilter(event.target.checked);
  };

  return (
    <>
      <Accordion square sx={{ width: '100%', marginTop: '4px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ height: '2.2rem', minHeight: 'unset', width: '100%', '&.Mui-expanded': { minHeight: '2rem' } }}
        >
          <Typography>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }}>
            <FormGroup row sx={{ justifyContent: 'space-between' }}>
              {displaySortBy && (
                <Box>
                  <InputLabel
                    id="comments-filter-label"
                    color={mode === 'light' ? 'primary' : 'secondary'}
                    sx={{ left: 'unset' }}
                  >
                    Sort by
                  </InputLabel>
                  <Select
                    labelId="comments-filter-label"
                    id="comments-filter"
                    value={sortByFilter}
                    label="Sort by"
                    onChange={handleSortByChange}
                    size="small"
                    color={mode === 'light' ? 'primary' : 'secondary'}
                    MenuProps={{
                      disablePortal: true,
                    }}
                    sx={{
                      fontSize: '0.875rem',
                      '&:focus': {
                        color: 'primary',
                      },
                    }}
                  >
                    <MenuItem dense value={'new'}>
                      Newest
                    </MenuItem>
                    <MenuItem dense value={'old'}>
                      Oldest
                    </MenuItem>
                    <MenuItem dense value={'top'}>
                      Top
                    </MenuItem>
                  </Select>
                </Box>
              )}
              {isLoggedIn && (
                <Box sx={{ ml: 1 }}>
                  <FormControlLabel
                    label={
                      <Typography variant="body2" color="textSecondary">
                        Nsfw comments
                      </Typography>
                    }
                    control={
                      <Checkbox
                        value="nsfw"
                        checked={nsfwFilter}
                        onChange={handleNsfwChange}
                        size="small"
                        sx={{
                          color: 'secondary',
                          '&.Mui-checked': {
                            color: mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.light,
                          },
                          '& .MuiSvgIcon-root': { fontSize: '0.875rem' },
                        }}
                      />
                    }
                  />
                </Box>
              )}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
