import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

function MeetingFormModal ({ open, handleClose }) {
  const { meetings, setMeetings } = useContext(AppContext);
  const [meetingData, setMeetingData] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    date: "",
    attendees: "",
  });

  const handleInputChange = (e) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newMeeting = {
      ...meetingData,
      attendees: meetingData.attendees.split(","),
    };
    setMeetings([...meetings, newMeeting]);

    setMeetingData({
      title: "",
      description: "",
      start_time: "",
      end_time: "",
      date: "",
      attendees: "",
    });
    handleClose();
  };


  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Schedule Meeting</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={meetingData.title}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={meetingData.description}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="start_time"
              label="Start Time"
              type="time"
              fullWidth
              value={meetingData.start_time}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="end_time"
              label="End Time"
              type="time"
              fullWidth
              value={meetingData.end_time}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="date"
              label="Date"
              type="date"
              fullWidth
              value={meetingData.date}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="attendees"
              label="Add Attendees"
              type="text"
              fullWidth
              value={meetingData.attendees}
              onChange={handleInputChange}
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