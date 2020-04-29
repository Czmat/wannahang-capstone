import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import FavButton from './FavButton';
import DeclineAcceptanceButton from './eventButtons/DeclineAcceptanceButton';
import InviteButton from './InviteButton';
import UnInviteButton from './eventButtons/UnInviteButton';
import EditEventButton from './eventButtons/EditEventButton';
import EditEventDetail from './EditEventDetail';

const UserEventDetail = ({
  events,
  setEvents,
  auth,
  eventId,

  setEventId,
  savedAsFav,
  setSavedAsFav,
  isGoing,
  setIsGoing,
  isNotGoing,
  setIsNotGoing,

  userEvents,
  // declineInvite,
  myUserEvents,
  userEventDetail,
  eventDetail,
  setEventDetail,
  joinedUser,
  setJoinedUser,
  users,
  setUserEvents,
  invitedUser,
  setInvitedUser,
  invitedUserEvent,
  headers,
  //userEventsForSelectedEvent,
}) => {
  const [renderEventEdit, setRenderEventEdit] = useState('');

  useEffect(() => {}, [renderEventEdit]);

  const inviteUser = (acceptEvent) => {
    axios.post('/api/user_events', acceptEvent).then((response) => {
      const newUserEvent = response.data;
      setUserEvents([...userEvents, newUserEvent]);
    });
  };

  const unInviteUser = (invitedUserEventId) => {
    axios.delete(`/api/user_events/${invitedUserEventId}`).then(() => {
      setUserEvents(
        userEvents.filter((_userEvent) => _userEvent.id !== invitedUserEventId)
      );
      setInvitedUser('');
    });
  };

  const declineAcceptance = (declineUserEvent) => {
    if (declineUserEvent.isFavorite) {
      axios
        .put(`/api/user_events/${declineUserEvent.id}`, declineUserEvent)
        .then((response) => {
          const userEvent = response.data;
          const updated = userEvents.map((_userEvent) =>
            _userEvent.id === userEvent.id ? userEvent : _userEvent
          );
          setUserEvents(updated);
          setJoinedUser('');
        });
      axios
        .put(`/api/events/${eventDetail.id}`, {
          ...eventDetail,
          isAccepted: false,
        })
        .then((response) => {
          const returnedE = response.data;
          const updated = events.map((_event) =>
            _event.id === returnedE.id ? returnedE : _event
          );
          setEvents(updated);
        });
    } else {
      axios.delete(`/api/user_events/${declineUserEvent.id}`).then(() => {
        setUserEvents(
          userEvents.filter(
            (_userEvent) => _userEvent.id !== declineUserEvent.id
          )
        );
        setJoinedUser('');
      });
      axios
        .put(`/api/events/${eventDetail.id}`, {
          ...eventDetail,
          isAccepted: false,
        })
        .then((response) => {
          const returnedE = response.data;
          const updated = events.map((_event) =>
            _event.id === returnedE.id ? returnedE : _event
          );
          setEvents(updated);
        });
    }
  };

  const deleteEvent = (eventToDelete) => {
    const userEventsForSelectedEvents = userEvents.filter(
      (ue) => ue.eventId === eventDetail.id
    );
    if (userEventsForSelectedEvents.length) {
      axios
        .post(`/api/userEvents/array/delete`, userEventsForSelectedEvents)
        .then(() => {
          const updated = userEvents.filter(
            (userEvent) => userEvent.eventId !== eventToDelete.id
          );
          setUserEvents(updated);
          axios
            .delete(`/api/events/${eventToDelete.id}`)
            .then(() =>
              setEvents(events.filter((e) => e.id !== eventToDelete.id))
            );
        });
    } else {
      axios
        .delete(`/api/events/${eventToDelete.id}`)
        .then(() => setEvents(events.filter((e) => e.id !== eventToDelete.id)));
    }
  };

  if (renderEventEdit) {
    return (
      <div>
        <EditEventDetail
          setEvents={setEvents}
          setEventDetail={setEventDetail}
          eventDetail={eventDetail}
          setRenderEventEdit={setRenderEventEdit}
          headers={headers}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h1>User Event Detail</h1>
          <div className="card" style={{ width: '35rem' }}>
            <div className="card-body">
              <h5 className="card-title">{eventDetail.name}</h5>
              <h5 className="card-title">
                {moment(eventDetail.date).format('MMMM Do YYYY, h:mm a')}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {eventDetail.location}
              </h6>
              <p className="card-text">{eventDetail.description}</p>

              {joinedUser ? (
                ''
              ) : (
                <p className="card-text">Has not been accepted yet</p>
              )}
              {eventDetail.isPublic && joinedUser ? (
                <DeclineAcceptanceButton
                  joinedUser={joinedUser}
                  userEventDetail={userEventDetail}
                  declineAcceptance={declineAcceptance}
                />
              ) : (
                <p>This event is Public and hasnt been accepted</p>
              )}
              {!eventDetail.isPublic && invitedUser && !joinedUser ? (
                <UnInviteButton
                  invitedUser={invitedUser}
                  unInviteUser={unInviteUser}
                  eventDetail={eventDetail}
                  invitedUserEvent={invitedUserEvent}
                />
              ) : (
                ''
              )}
              {!eventDetail.isPublic && !invitedUser && !joinedUser ? (
                <InviteButton
                  users={users}
                  inviteUser={inviteUser}
                  eventDetail={eventDetail}
                />
              ) : (
                ''
              )}

              <button
                onClick={() => {
                  setJoinedUser('');
                  setEventDetail('');
                }}
              >
                Close Detail
              </button>
              <EditEventButton
                eventDetail={eventDetail}
                setRenderEventEdit={setRenderEventEdit}
              />
              <button
                onClick={() => {
                  deleteEvent(eventDetail);
                  setJoinedUser('');
                  setEventDetail('');
                }}
                className="btn btn-secondary"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default UserEventDetail;
