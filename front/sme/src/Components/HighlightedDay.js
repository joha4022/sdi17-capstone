import { Badge } from "@mui/material";
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

function HighlightedDay(props) {
  const { day, outsideCurrentMonth, meetingDays = {}, ...other } = props;
  const dateKey = day.format('MM-DD-YYYY');
  const isMeetingDay = !outsideCurrentMonth && meetingDays[dateKey] > 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isMeetingDay ? '🌚' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}


// export default HighlightedDay;