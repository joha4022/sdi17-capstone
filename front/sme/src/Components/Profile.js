import React,{ useState, useEffect, useRef } from "react";
import { Typography, Button, Avatar, Paper, Grid, Badge, TextField, Box as MuiBox } from "@mui/material";
import { styled } from "styled-components";
import { ProfileDetails, ProfileDetail, Background, Bio, Notes } from "../Styled";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import EventNoteIcon from '@mui/icons-material/EventNote';
import Loader from "./Loader";
import MeetingFormModal from "./MeetingFormModal";
import dayjs from "dayjs";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Highlight } from "@mui/icons-material";
import HighlightedDay from "./HighlightedDay";

const Meetings = styled(Paper)`
  flex-grow: 3;
  overflow: auto;
  margin: 20px;
  padding: 20px;
`;

const AvatarAndDetails = styled(MuiBox)`
  flex-shrink: 0;
  flex-basis: 100px;
`;

function Profile({ userId }) {
  const [users, setUsers] = useState(null);
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || []);
  const [newNote, setNewNote] = useState("");
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bio, setBio] = useState('');
  const requestAbortController = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3001/profile/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }else {
        const data = await res.json();
        setUsers(data[0]);
        setBio(data[0].bio);
        }
      } catch (error) {
        console.error("Failed to fetch profile data: ", error);
      }
    };
    fetchProfile();
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3001/usermeetings/${id}`)
      .then(res => res.json())
      .then(data => setMeetings(data))
      .catch(err => console.log('Error:', err))
  }, [id]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    fetchHighlightedDays(selectedDate);
    return () => {requestAbortController.current?.abort()};
  }, []);

  const fetchHighlightedDays = async (date) => {
    const controller = new AbortController();
    fetch(`http://localhost:3001/usermeetings/${id}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        const dayToHighlight = data.map((meeting) => meeting.meetingDate);
        setHighlightedDays(dayToHighlight);
        console.log(dayToHighlight);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Aborted", err);
        }
      });
    requestAbortController.current = controller;
  };

  function updateUserBio(userid,newBio) {
    fetch(`http://localhost:3001/updateuser`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: userid,
        bio: newBio,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Failed to PATCH BIO:', error);
      });
  }


  if (!users) {
    return <Loader />;
  };

  const handleAddNote = (e) => {
    e.preventDefault();

    const updatedNotes = [...notes, { text: newNote, checked: false }];
    setNotes(updatedNotes);
    /* setNotes((prevNotes) => [...prevNotes, { text: newNote, checked: false }]); */
    setNewNote("");
  };

  const handleEditNote = (index) => {
    setEditingNoteIndex(index);
    setEditingNoteText(notes[index].text);
  };

  const handleUpdateNote = (e) => {
    e.preventDefault();

    const updatedNotes = notes.map((note, i) => 
    i === editingNoteIndex ? { ...note, text: editingNoteText } : note
    );
    setNotes(updatedNotes);
    setEditingNoteIndex(null);
    setEditingNoteText("");
  };

  const handleCheckNote = (index) => {
    setNotes((prevNotes) =>
      prevNotes.map((note, i) =>
        i === index ? { ...note, checked: !note.checked } : note
      )
    );
  };
  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((note, i) => i !== index);
    setNotes(updatedNotes);
  };

  const openMeetingModal = () => {
    setIsMeetingModalOpen(true);
  };

  const closeMeetingModal = () => {
    setIsMeetingModalOpen(false);
  };

  return (
    <Background>
      <Navbar />
      <Grid container spacing={2} style={{ padding: 20 }}>
        <Grid item xs={12} sm={3}>
        <AvatarAndDetails>
          <Paper elevation={4} sx={{ margin: 4, padding: 6, display: 'flex', justifyContent: 'center' }}>
            <Avatar              
              src={users && users.photo ? users.photo : "/images/Blank_Avatar.jpg"}
              sx={{ width: 200, height: 200 }} />
          </Paper>
          <Paper elevation={2} sx={{ margin: 4, padding: 5 }}>
            <MuiBox>
              <ProfileDetails>
                <Typography variant="h5">Name:</Typography>
                
                <ProfileDetail> {users && `${users.firstname} ${users.lastname}`}</ProfileDetail>
              
              </ProfileDetails>
              <ProfileDetails>
                <Typography variant="h5">Location:</Typography>
                <ProfileDetail> {users && users.basename}</ProfileDetail>
                <ProfileDetail> {users && users.worklocation}</ProfileDetail>
              </ProfileDetails>
              <ProfileDetails>
                <Typography variant="h5">Associated Branch:</Typography>
                <ProfileDetail> {users && users.branch}</ProfileDetail>
              </ProfileDetails>
            </MuiBox>
            <MuiBox sx={{display: 'flex', justifyContent:'center', border: '1px solid #A3816A'}}>            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar 
            defaultValue={dayjs()}
            loading={isLoading}
            onMonthChange={fetchHighlightedDays}
            views={['year', 'month', 'day']}
            showDaysOutsideCurrentMonth fixedWeekNumber={6}
            slots={{
              day: HighlightedDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }}
            />
            </LocalizationProvider>
              </MuiBox>
          </Paper>
        </AvatarAndDetails>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Paper elevation={1} sx={{ margin: 1, padding: 1 }}>
            <Bio>
              <Typography variant="h5" >Bio</Typography>
              <TextareaAutosize
                style={{ width: "100%", resize: "none", fontSize: "1.3em", fontFamily: "Arial",border: '1px solid #A3816A' }}               
                minRows={3}
                maxRows={50}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                />
              <Button onClick={() => updateUserBio(users.userid,bio)}>Update Bio</Button>
            </Bio>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper elevation={1} sx={{ margin: 1, padding: 1 }}>
            <Meetings>
              Meetings:
              <ul>
                {meetings.map(meeting => (
                  <li key={meeting.meetingid}>
                    <Typography>{meeting.meetingTitle}-{meeting.meetingDescription}-{meeting.startTime}-{meeting.endTime}-{meeting.meetingDate}</Typography>
                  </li>
                ))}
              </ul>              
              <Button onClick={openMeetingModal}>Schedule Meeting</Button>
              <MeetingFormModal
            open={isMeetingModalOpen}
            handleClose={closeMeetingModal}/>
            </Meetings>
          </Paper>
          
          <MuiBox display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: 1, padding: 1 }}>
              Approve (SME)
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: 1, padding: 1 }}>
              Decline (SME)
            </Button>
          </MuiBox>

          <Paper elevation={1} sx={{ margin: 1, padding: 1 }}>
            <Notes>
              Notes:
              <form onSubmit={handleAddNote}>
                <textarea
                  style={{ width: "100%", resize: "none", fontSize: "1.3em", fontFamily: "Arial",border: '1px solid #A3816A' }}
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}/>
                <button type="submit">Add Note</button>
              </form>
              <ul>
                {notes.map((note, index) => (
                  <li key={index}>
                    {editingNoteIndex === index ? (
                      <form onSubmit={handleUpdateNote}>
                        <textarea
                          style={{ width: "90%", fontSize: "1.1em", fontFamily: "Arial", resize: 'none' }}                      
                          rows={3}
                          value={editingNoteText}
                          onChange={(e) => setEditingNoteText(e.target.value)}
                        />
                        <button type="submit">Update Note</button>
                      </form>
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          checked={note.checked}
                          onChange={() => handleCheckNote(index)}
                        />
                        <span style={{ textDecoration: note.checked ? "line-through" : "none" }}>
                          {note.text}
                        </span>
                        <button onClick={() => handleEditNote(index)}>Edit</button>
                        <button style={{color: 'red' }}onClick={() => handleDeleteNote(index)}>X</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </Notes>
          </Paper>
        </Grid>
      </Grid>
    </Background>
  );
}

export default Profile;