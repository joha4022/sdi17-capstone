import React,{ useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Avatar, Paper, Grid, Badge, Box as MuiBox, Alert } from "@mui/material";
import { ProfileDetails, ProfileDetail, Background, Bio, Notes, Meetings, AvatarAndDetails } from "../Styled";
import Navbar from "./Navbar";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Loader from "./Loader";
import MeetingFormModal from "./MeetingFormModal";
import dayjs from "dayjs";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import FooterBar from "./FooterBar";
import { AppContext } from '../App.js';

function Profile({ userId }) {
  const [users, setUsers] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [bio, setBio] = useState('');
  const [inNetwork, setInNetwork] = useState(false)
  const [smeCategories, setSMECategories] = useState(['']);
  const [badgePosition, setBadgePosition] = useState({
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { id } = useParams();
  const { currentUser } = useContext(AppContext);
  const [photo, setPhoto] = useState();
  // const [highlightedDays, setHighlightedDays] = useState([]);
  // const [isLoading, setIsLoading] = useState(false); 
  // const requestAbortController = useRef(null); 
  // const id = JSON.parse (sessionStorage.getItem('currentUser')).userid;


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3001/profile/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        } else {
        const data = await res.json();
        setUsers(data[0]);
        setBio(data[0].bio);

        if (data[0] && data[0].userverified === 'verified' && data[0].sme === true) {
          const resSME = await fetch(`http://localhost:3001/smecategories/${id}`);
          if (!resSME.ok){
          throw new Error(`HTTP error! status: ${resSME.status}`);
        } else {
          const smeData = await resSME.json();
          // console.log('SME Data: ', smeData);
          setSMECategories(smeData.map(sme => sme.categories).flat());
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch Profile Data: ", error);
    }
    };
    fetchProfile();
  }, [id, meetings]);

useEffect(() => {
  if (users) {
    fetch('http://localhost:3001/getphoto', {
      method: 'POST',
      headers: { 'Content-type' : 'application/json' },
      body: JSON.stringify({ photopath: users.photo })
    })
    .then(res => res.blob())
    .then(data => setPhoto(URL.createObjectURL(data)))
  }
}, [users]);

  useEffect(() => {
    fetch(`http://localhost:3001/usermeetings/${id}`)
      .then(res => res.json())
      .then(data => setMeetings(data))
      .catch(err => console.log('Error:', err))
  }, [id]);

  useEffect(() => {
    if (currentUser) {
      const currentNotes = JSON.parse(localStorage.getItem(`notes-${currentUser.userid}`)) || [];
      setNotes(currentNotes);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`notes-${currentUser.userid}`, JSON.stringify(notes));
    }
  }, [currentUser, notes]);

  const addToNetwork = () => {
    fetch('http://localhost:3001/network', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        user_id: currentUser.userid,
        sme_id: Number(id)
      })
    })
    .then(res => res.json())
      .then(data => {
        // console.log('Success:', data)
        setInNetwork(true)
        if(data.message === "SME is already in your network !") {
          const alert = window.alert('User is already in network');
        }
        })
      .catch((error) => {
        console.log('Failed to POST network:', error)
      });
  }

  const removeFromNetwork = () => {
    fetch('http://localhost:3001/deletenetworkSME', {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        user_id: currentUser.userid,
        sme_id: Number(id)
      })
    })
    .then(res => res.json())
      .then(data => {
        // console.log('Success:', data)
        setInNetwork(false)
        })
      .catch((error) => {
        console.log('Failed to DELETE network:', error)
      });
  }

  function updateUserBio(userid, newBio) {
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
        setUsers({ ...users, bio: newBio });
        })
      .catch((error) => {
        console.log('Failed to PATCH BIO:', error);
      });
  }

  const handleDeleteMeeting = (meetingId) => {
    console.log(`Deleting meeting with ID: ${meetingId}`);

  const confirmDelete = window.confirm('Are you sure you want to delete this meeting?');
    if (confirmDelete) {
      fetch('http://localhost:3001/deletemeeting', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
          meetingid: meetingId,
        }),
        })
        .then ((res) => res.json())
        .then((data) => {
          console.log ('Success:', data);
          setMeetings(meetings.filter((meeting) => meeting.meetingid !== meetingId));
        })
        .catch ((error) => {
          console.log('Failed to Delete Meeting:', error);
        });
    }
    };

  if (!users) {
    return <Loader />;
  };

  const handleAddNote = (e) => {
    e.preventDefault();

    const updatedNotes = [...notes, { text: newNote, checked: false, userid: currentUser.userid }];
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
            <Paper
              elevation={4}
              sx={{
                margin: 4,
                padding: 6,
                display: "flex",
                justifyContent: "center",
              }}>
                <Badge
                overlap='circular'
                anchorOrigin={badgePosition}
                badgeContent={users.sme === true ? 
                  <MuiBox sx={{ textAlign: 'center' }}>
                  <img src="/images/Verified.png" alt="SME ICON" style={{width: '50%'}}/>
                </MuiBox>
                : null }>
              <Avatar 
                src={photo || "/default.png"} // Use a placeholder image while loading
                alt="User Profile Picture"
                sx={{ width: 200, height: 200 }}
              />
              </Badge>
            </Paper>
            <Paper elevation={2} sx={{ margin: 4, padding: 5 }}>
              <MuiBox>
                {/* {users.userverified && (
                  <Typography variant="h6">SME</Typography>
                )} */}
                <ProfileDetails>
                  <Typography variant="h5">Name:</Typography>
                  <ProfileDetail>
                    {users && `${users.firstname} ${users.lastname}`}
                  </ProfileDetail>
                </ProfileDetails>
                {users.sme === 'true' ? (
                <ProfileDetails>                 
                  <Typography variant="h5">SME Categories:</Typography>
                  <ProfileDetail>
                    {smeCategories ? smeCategories.join(', ') : 'No Categories'}
                  </ProfileDetail>
                </ProfileDetails>
                  ) : ( null )}
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
              <MuiBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid #A3816A",
                  marginTop: 8,
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    defaultValue={selectedDate}
                    onChange={setSelectedDate}
                    views={["year", "month", "day"]}
                    showDaysOutsideCurrentMonth
                    fixedWeekNumber={6}
                  />
                </LocalizationProvider>
              </MuiBox>
            </Paper>
          </AvatarAndDetails>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Paper elevation={1} sx={{ margin: 1, padding: 1 }}>
            <Bio>
              <Typography variant="h5">Bio</Typography>
              <TextareaAutosize
                style={{
                  width: "100%",
                  resize: "none",
                  fontSize: "1.3em",
                  fontFamily: "Arial",
                  border: "1px solid #A3816A",
                }}
                minRows={3}
                maxRows={50}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={Number(id) !== currentUser.userid}
              />
              <Button
                onClick={() => updateUserBio(users.userid, bio)}
                disabled={Number(id) !== currentUser.userid}
              >
                Update Bio
              </Button>
            </Bio>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={1} sx={{ margin: 1, padding: 1 }}>
            <Meetings>
              Meetings:
              <ul>
                {meetings.map((meeting) => (
                  <li key={meeting.meetingid}>
                    <Grid container direction="row" alignItems="center">
                      <Grid item xs={11}>
                        <Typography>
                          Title: 
                          {meeting.meetingTitle}
                          Description: 
                          {meeting.meetingDescription}
                          Start Time: 
                          {meeting.startTime}
                          End Time: 
                          {meeting.endTime}
                          Meeting Date: 
                          {meeting.meetingDate}
                        </Typography>
                      </Grid>
                      {Number(id) === currentUser.userid && (
                        <Grid item xs={1}>
                          <Button
                            onClick={() =>
                              handleDeleteMeeting(meeting.meetingid)}
                            variant="outlined"
                            sx={{
                              float: "right",
                              width: "65px",
                              height: "20px",
                              fontSize: "0.6em",
                              borderColor: "red",
                              color: "red",
                              borderWidth: "2px",
                              borderRadius: "2px",
                              padding: 0,
                              transition: "0.3s",
                              "&:hover": {
                                backgroundColor: "red",
                                color: "white",
                              },
                            }}
                            >
                            Delete
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </li>
                ))}
              </ul>
              <Button
                onClick={openMeetingModal}
                disabled={Number(id) !== currentUser.userid}
              >
                Schedule Meeting
              </Button>
              <MeetingFormModal
                open={isMeetingModalOpen}
                handleClose={closeMeetingModal}
              />
            </Meetings>
          </Paper>
          <Paper elevation={1} sx={{ margin: 1, padding: 1 }}>
            <Notes>
              Notes:
              <form onSubmit={handleAddNote}>
                <textarea
                  style={{
                    width: "100%",
                    resize: "none",
                    fontSize: "1.3em",
                    fontFamily: "Arial",
                    border: "1px solid #A3816A",
                  }}
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  disabled={Number(id) !== currentUser.userid}
                />
                <Button
                  type="submit"
                  disabled={Number(id) !== currentUser.userid}
                >
                  Add Note
                </Button>
              </form>
              <ul>
                {notes.map(
                  (note, index) =>
                    note.userid === currentUser.userid && Number(id) === currentUser.userid && (
                      <li key={index}>
                        {editingNoteIndex === index ? (
                          <form onSubmit={handleUpdateNote}>
                            <textarea
                              style={{
                                width: "90%",
                                fontSize: "1.1em",
                                fontFamily: "Arial",
                                resize: "none",
                              }}
                              rows={3}
                              value={editingNoteText}
                              onChange={(e) =>
                                setEditingNoteText(e.target.value)
                              }
                            />
                            <Button type="submit">Update Note</Button>
                          </form>
                        ) : (
                          <>
                            <input
                              type="checkbox"
                              checked={note.checked}
                              onChange={() => handleCheckNote(index)}
                            />
                            <span
                              style={{
                                textDecoration: note.checked
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {note.text}
                            </span>
                            <Button onClick={() => handleEditNote(index)}>
                              Edit
                            </Button>
                            <Button
                              style={{ color: "red", fontWeight: "bold" }}
                              onClick={() => handleDeleteNote(index)}
                            >
                              X
                            </Button>
                          </>
                        )}
                      </li>
                    )
                )}
              </ul>
            </Notes>
          </Paper>
          <Button
                onClick={() => {(!inNetwork) ? addToNetwork() : removeFromNetwork()}}
                disabled={Number(id) === currentUser.userid}
              >
                {inNetwork ? 'Remove from Network':'Add to Network'}
          </Button>
        </Grid>
      </Grid>
      <FooterBar />
    </Background>
    
  );
}

export default Profile;