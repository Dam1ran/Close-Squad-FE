/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Tooltip } from '../../../..';
import { CharacterClass } from '../../../../../../models/api.models';
import { CharacterSimpleDto } from '../../../../../../models/signalR';

export const CharacterSimpleInfoTooltip: React.FC<{
  children: React.ReactElement<any, any>;
  character: CharacterSimpleDto;
}> = React.forwardRef(({ character, children }, ref) => {
  return (
    <Tooltip
      ref={ref}
      arrow
      title={
        <Box>
          <Box sx={{ fontStyle: 'italic', color: (theme) => theme.palette.grey[800] }}>
            {CharacterClass[character.characterClass]}
          </Box>
        </Box>
      }
      PopperProps={{
        sx: {
          '& .MuiTooltip-tooltip': { backgroundColor: (theme) => theme.palette.grey[100] },
          '& .MuiTooltip-arrow::before': { backgroundColor: (theme) => theme.palette.grey[100] },
        },
      }}
    >
      {children}
    </Tooltip>
  );
});
