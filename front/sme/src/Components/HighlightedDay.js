import { Badge } from "@mui/material";
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

function HighlightedDay(props) {
  console.log(props.highlightedDays[0]);
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected = !props.outsideCurrentMonth && highlightedDays.includes(day.format('MM-DD-YYYY'));

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🌚' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

// export default HighlightedDay;