import React from 'react';
import { v4 } from 'uuid';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const rows = [
  {
    id: v4(),
    name: 'USA',
    date: new Date().toJSON(),
    days: 12,
  },
  {
    id: v4(),
    name: 'Canada',
    date: new Date().toJSON(),
    days: 3,
  },
  {
    id: v4(),
    name: 'Ukraine',
    date: new Date().toJSON(),
    days: 110,
  },
];

export default function JourneyTable() {
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  return (
    <React.Fragment>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
          textAlign: 'initial',
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 120, padding: '12px 6px', paddingLeft: 30 }}>Name</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Days</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td style={{ paddingLeft: 30 }}>
                  <Typography level="body-xs">{row.name}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.date}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.days}</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <IconButton color="warning">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="danger">
                      <HighlightOffIcon />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}
