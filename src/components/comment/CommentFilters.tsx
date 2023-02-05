import React from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';
import { ColorModeContext } from '../session/ThemeContextProvider';

export const CommentFilters = () => {
  const theme = useTheme();
  const { mode } = React.useContext(ColorModeContext);
  const [sortBy, setSortBy] = React.useState('newest');
  const [nsfw, setNsfw] = React.useState(false);

  const handleSortByChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleNsfwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNsfw(event.target.checked);
  };

  return (
    <>
      <Paper elevation={3} sx={{ mt: 1, p: 0.5 }}>
        <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }}>
          <FormGroup row sx={{ justifyContent: 'space-between' }}>
            <Box>
              <InputLabel id="comments-filter-label" sx={{ left: 'unset' }}>
                Sort by
              </InputLabel>
              <Select
                labelId="comments-filter-label"
                id="comments-filter"
                value={sortBy}
                label="Sort by"
                onChange={handleSortByChange}
                size="small"
              >
                <MenuItem dense value={'newest'}>
                  Newest
                </MenuItem>
                <MenuItem dense value={'oldest'}>
                  Oldest
                </MenuItem>
                <MenuItem dense value={'top'}>
                  Top
                </MenuItem>
              </Select>
            </Box>
            <Box>
              <FormControlLabel
                label={
                  <Typography variant="body2" color="textSecondary">
                    Nsfw comments
                  </Typography>
                }
                control={
                  <Checkbox
                    value="nsfw"
                    checked={nsfw}
                    onChange={handleNsfwChange}
                    size="small"
                    sx={{
                      color: 'secondary',
                      '&.Mui-checked': {
                        color: mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.light,
                      },
                      '& .MuiSvgIcon-root': { fontSize: 16 },
                    }}
                  />
                }
              />
            </Box>
          </FormGroup>
        </FormControl>
      </Paper>
    </>
  );
};
