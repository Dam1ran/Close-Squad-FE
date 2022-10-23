import { useState } from 'react';
import { Box, Tab, TabPanel, Tabs } from '../../../../../../elements';
import { SkillsAndActionsTabContent } from './components/skillsAndActionsTabContent';
import { StatusTabContent } from './components/statusTabContent';

const tabComponents: { label: string; content: string | React.ReactNode }[] = [
  { label: 'Status', content: <StatusTabContent /> },
  { label: 'Inventory', content: 'Inventory' },
  { label: 'S/A', content: <SkillsAndActionsTabContent /> },
  { label: 'Clan', content: 'Clan' },
  { label: 'Party', content: 'Party' },
  { label: 'Quest', content: 'Quest' },
];

export const CharacterTabs: React.FC<{ buttonColumns: number }> = ({ buttonColumns }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box sx={{ height: '100%', width: `calc(100% - ${buttonColumns * 42}px)` }}>
      <Box
        sx={{
          borderBottom: 1,
          userSelect: 'none',
          borderColor: 'divider',
          '& .MuiTabs-root': {
            minHeight: '32px',
            height: '32px',
            '& button': {
              minHeight: '32px',
              padding: 0,
            },
            '& .MuiTabScrollButton-horizontal': {
              opacity: 1,
            },
            '& .Mui-disabled': {
              '& svg': {
                opacity: 0.2,
              },
            },
          },
        }}
      >
        <Tabs value={tabIndex} onChange={(_, val): void => setTabIndex(val)} scrollButtons="auto" variant="scrollable">
          {Object.values(tabComponents).map((tc, i) => (
            <Tab key={i} sx={{ minWidth: '70px' }} label={tc.label} />
          ))}
        </Tabs>
      </Box>
      {Object.values(tabComponents).map((tc, i) => (
        <TabPanel key={i} value={tabIndex} index={i}>
          {tc.content}
        </TabPanel>
      ))}
    </Box>
  );
};
