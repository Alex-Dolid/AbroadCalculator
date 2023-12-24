import React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';

const rows = [
  {
    id: 'INV-1234',
    date: 'Feb 3, 2023',
    status: 'Refunded',
  },
  {
    id: 'INV-1233',
    date: 'Feb 3, 2023',
    status: 'Paid',
  },
  {
    id: 'INV-1232',
    date: 'Feb 3, 2023',
    status: 'Refunded',
  },
];

type Order = 'asc' | 'desc';

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
              <th style={{ width: 120, padding: '12px 6px', paddingLeft: 30 }}>Invoice</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td style={{ paddingLeft: 30 }}>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.date}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Paid: <CheckRoundedIcon />,
                        Refunded: <AutorenewRoundedIcon />,
                        Cancelled: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        Paid: 'success',
                        Refunded: 'neutral',
                        Cancelled: 'danger',
                      }[row.status] as ColorPaletteProp
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Link level="body-xs" component="button">
                      Download
                    </Link>
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
