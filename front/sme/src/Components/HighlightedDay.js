import { Badge } from "@mui/material";
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

function HighlightedDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.includes(day.format('YYYY-MM-DD'));

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

export default HighlightedDay;


// style={{ width: "100%", resize: "none", fontSize: "1.3em", fontFamily: "Arial",border: '1px solid #A3816A' }}