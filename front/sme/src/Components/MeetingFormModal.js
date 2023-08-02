import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { debounce } from "lodash";
import MuiAlert from "@mui/material/Alert";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar } from "@mui/material";
import { StyledAutosuggest } from "../Styled";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function MeetingFormModal ({ open, handleClose }) {
  const { meetings, setMeetings } = useContext(AppContext);
  const [suggestions, setSuggestions] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertPosition, setAlertPosition] = useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const [meetingData, setMeetingData] = useState({
    meetingTitle: "",
    meetingDescription: "",
    startTime: "",
    endTime: "",
    meetingDate: "",
    attendees: "",
  });

  const handleInputChange = (e) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedMeetingDate = new Date(meetingData.meetingDate);
    const currentDate = new Date();

    const newMeeting = {
      meetingTitle: meetingData.meetingTitle,
      meetingDescription: meetingData.meetingDescription,
      startTime: meetingData.startTime,
      endTime: meetingData.endTime,
      meetingDate: meetingData.meetingDate,
      attendees: meetingData.attendees
        .split(",")
        .map((attendee) => attendee.trim()),
    };
    if (selectedMeetingDate < currentDate) {
      alert(`You cannot schedule a meeting before ${currentDate.toLocaleDateString()}.`);
      return;
    }
    fetch("http://localhost:3001/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMeeting),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setMeetings([...meetings, data]);
        setMeetingData({
          meetingTitle: "",
          meetingDescription: "",
          startTime: "",
          endTime: "",
          meetingDate: "",
          attendees: "",
        });
        handleClose();        
        setOpenAlert(true);
        setAlertSeverity("success");        
      })
      .catch((error) => {
        console.error("Error:", error);
        setOpenAlert(true);
        setAlertSeverity("error");
      });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const getSuggestions = async (value) => {
    const lastUsername = value.split(',').pop().trim();
    const query = lastUsername.toLowerCase();

    try {
      const response = await fetch(`http://localhost:3001/users/suggest?q=${query}`);
      const data = await response.json();
      const filteredSuggestions = data.filter(
        (suggestion) => suggestion.username.toLowerCase().includes(query)
      );
      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.log('Failed to fetch suggestions:', error);
    }
  };

  const debounceGetSuggestions = debounce(getSuggestions, 500);

  const onSuggestionFetchRequested = ({ value }) => {
    debounceGetSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.username;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.username}
    </div>);

const NoTransition = (props) => {
  return props.children;
};

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Schedule Meeting</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="meetingTitle"
              label="Title"
              type="text"
              fullWidth
              value={meetingData.meetingTitle}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="meetingDescription"
              label="Description"
              type="text"
              fullWidth
              value={meetingData.meetingDescription}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="startTime"
              label="Start Time"
              type="time"
              fullWidth
              value={meetingData.startTime}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="endTime"
              label="End Time"
              type="time"
              fullWidth
              value={meetingData.endTime}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="meetingDate"
              // label="Date"
              type="date"
              fullWidth
              value={meetingData.meetingDate}
              onChange={handleInputChange}
            />
            <StyledAutosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              renderSuggestionsContainer={({
                containerProps,
                children,
                query,
              }) => (
                <div
                  {...containerProps}
                  style={{ maxHeight: "200px", overflow: "auto" }}
                >
                  {children}
                </div>
              )}
              inputProps={{
                value: meetingData.attendees,
                placeholder: "Attendees",
                onChange: (_, { newValue, method }) => {
                  if (
                    method === "click" ||
                    method === "down" ||
                    method === "up" ||
                    method === "enter"
                  ) {
                    const usernames = meetingData.attendees.split(",");
                    usernames.pop();
                    usernames.push(newValue);
                    newValue = usernames.join(",");
                  }
                  setMeetingData({ ...meetingData, attendees: newValue });
                },
                name: "attendees",
              }}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add Meeting
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={alertPosition}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        TransitionComponent={NoTransition}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertSeverity === "success"
            ? "Meeting created successfully! You may need to refresh for the changes to show."
            : "Error creating meeting!"}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MeetingFormModal;