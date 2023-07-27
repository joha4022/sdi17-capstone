import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import Autosuggest from 'react-autosuggest';
import { debounce } from "lodash";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

function MeetingFormModal ({ open, handleClose }) {
  const { meetings, setMeetings } = useContext(AppContext);
  const [suggestions, setSuggestions] = useState([]);
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
    // setMeetings([...meetings, newMeeting]);
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
        setMeetings([...meetings, newMeeting]);
        setMeetingData({
          meetingTitle: "",
          meetingDescription: "",
          startTime: "",
          endTime: "",
          meetingDate: "",
          attendees: "",
        });
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getSuggestions = async (value) => {
    try {
      const response = await fetch(`http://localhost:3001/users/suggest?q=${value}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.log('Failed to fetch suggestions:', error);
    }
  };

  const debounceGetSuggestions = debounce(getSuggestions, 500);

  const onSuggestionFetchRequested = ( value ) => {
    debounceGetSuggestions(value.value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.username;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.username}
    </div>);



  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
              label="Date"
              type="date"
              fullWidth
              value={meetingData.meetingDate}
              onChange={handleInputChange}
            />
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={{
                value: meetingData.attendees,
                placeholder: "Attendees",
                onChange: (_, { newValue }) => {
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
    </div>
  );
}

export default MeetingFormModal;