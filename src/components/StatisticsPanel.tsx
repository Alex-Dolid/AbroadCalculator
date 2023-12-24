import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import React from 'react/index';

type Props = {
  today: Date;
  startCycleDate: Date;
  availableDays: number;
};

export default function StatisticsPanel({
  today,
  startCycleDate,
  availableDays,
}: Props): JSX.Element {
  return (
    <Card variant="soft">
      <CardContent style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography textColor="inherit" textAlign="left">
          Today:
        </Typography>
        <Typography level="title-lg" textColor="inherit">
          {today.toDateString()}
        </Typography>
        <Typography textColor="inherit" textAlign="left">
          Available:
        </Typography>
        <Typography level="title-lg" textColor="inherit">
          {availableDays} days
        </Typography>
        <Typography textColor="inherit" textAlign="left">
          Start Cycle Date:
        </Typography>
        <Typography level="title-lg" textColor="inherit">
          {startCycleDate.toDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
