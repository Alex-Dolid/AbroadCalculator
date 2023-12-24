import React from 'react';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Journey } from '../types';

type Props = {
  data: Journey[];
  onEdit: (id: Journey['id']) => void;
  onRemove: (id: Journey['id']) => void;
};

export default function JourneyTable({ data, onEdit, onRemove }: Props): JSX.Element {
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
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ paddingLeft: 30 }}>
                  <Typography level="body-xs">{item.name}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{new Date(item.startDate).toDateString()}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{item.days}</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <IconButton color="warning" onClick={() => onEdit(item.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="danger" onClick={() => onRemove(item.id)}>
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
