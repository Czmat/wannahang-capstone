import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import FavButton from './FavButton';
import DeclineButton from './DeclineButton';
import AcceptButton from './AcceptButton';

const EventDetail = ({
  events,
  setEvents,
  auth,
  eventId,
  users,
  setEventId,
  savedAsFav,
  setSavedAsFav,
  isGoing,
  setIsGoing,
  isNotGoing,
  setIsNotGoing,
  setUserEvents,
  userEvents,
  // declineInvite,
  myUserEvents,
}) => {
  const [eventDetail, setEventDetail] = useState({});
  const [eventCreator, setEventCreator] = useState({});

  useEffect(() => {
    setEventDetail(events.find((e) => e.id === eventId));
  }, []);

  useEffect(() => {
    setEventCreator(users.find((u) => u.id === eventDetail.userId));
  }, [eventDetail.userId]);

  const acceptInvite = (acceptEvent) => {
    //might have to address all userEvents once the event is accepted
    if (isNotGoing || savedAsFav) {
      axios
        .put(`/api/user_events/${acceptEvent.id}`, acceptEvent)
        .then((response) => {
          const userEvent = response.data;
          const updated = myUserEvents.map((_userEvent) =>
            _userEvent.id === userEvent.id ? userEvent : _userEvent
          );
          setUserEvents(updated);
          setIsGoing(userEvent);
        });
      axios
        .put(`/api/events/${eventDetail.id}`, {
          ...eventDetail,
          isAccepted: true,
        })
        .then((response) => {
          const returnedE = response.data;
          const updated = events.map((_event) =>
            _event.id === returnedE.id ? returnedE : _event
          );
          setEvents(updated);
        });
    } else {
      axios.post('/api/user_events', acceptEvent).then((response) => {
        const newUserEvent = response.data;
        setUserEvents([...myUserEvents, newUserEvent]);
        setIsGoing(newUserEvent);
      });
      axios
        .put(`/api/events/${eventDetail.id}`, {
          ...eventDetail,
          isAccepted: true,
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

  const declineInvite = (declineEvent) => {
    if (savedAsFav) {
      axios
        .put(`/api/user_events/${isGoing.id}`, declineEvent)
        .then((response) => {
          const userEvent = response.data;
          const updated = myUserEvents.map((_userEvent) =>
            _userEvent.id === userEvent.id ? userEvent : _userEvent
          );
          setUserEvents(updated);
          setIsGoing('');
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
      axios.delete(`/api/user_events/${isGoing.id}`).then(() => {
        setIsGoing('');
        setUserEvents(
          myUserEvents.filter((_userEvent) => _userEvent.id !== isGoing.id)
        );
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

  const addToFavorites = (addFavObj) => {
    if (isGoing) {
      axios
        .put(`/api/user_events/${isGoing.id}`, addFavObj)
        .then((response) => {
          const userEvent = response.data;
          const updated = myUserEvents.map((_userEvent) =>
            _userEvent.id === userEvent.id ? userEvent : _userEvent
          );
          setUserEvents(updated);
          setSavedAsFav(userEvent);
        });
    } else {
      axios.post('/api/user_events', addFavObj).then((response) => {
        const newUserEvent = response.data;
        setUserEvents([...myUserEvents, newUserEvent]);
        setSavedAsFav(newUserEvent);
      });
    }
  };

  const removeFromFavorites = (removeFavObj) => {
    if (isGoing) {
      axios
        .put(`/api/user_events/${removeFavObj.id}`, removeFavObj)
        .then((response) => {
          const userEvent = response.data;
          const updated = myUserEvents.map((_userEvent) =>
            _userEvent.id === userEvent.id ? userEvent : _userEvent
          );
          setUserEvents(updated);
          setSavedAsFav('');
        });
    } else {
      axios.delete(`/api/user_events/${removeFavObj.id}`).then(() => {
        setSavedAsFav('');
        setUserEvents(
          myUserEvents.filter((_userEvent) => _userEvent.id !== removeFavObj.id)
        );
      });
    }
  };
  return (
    <div>
      {eventCreator ? (
        <div>
          <h1>Event Detail</h1>
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
              <p className="card-text">
                Created by{' '}
                <Link
                  to="/meetups"
                  onClick={() => console.log('user detail')}
                  className="card-link"
                >
                  {eventCreator.username}
                </Link>{' '}
              </p>
              <FavButton
                addToFavorites={addToFavorites}
                auth={auth}
                isGoing={isGoing}
                savedAsFav={savedAsFav}
                setSavedAsFav={setSavedAsFav}
                removeFromFavorites={removeFromFavorites}
                eventDetail={eventDetail}
              />
              {isGoing ? (
                <DeclineButton
                  savedAsFav={savedAsFav}
                  declineInvite={declineInvite}
                />
              ) : (
                <AcceptButton
                  savedAsFav={savedAsFav}
                  acceptInvite={acceptInvite}
                  eventDetail={eventDetail}
                  auth={auth}
                />
              )}
              <button
                onClick={() => {
                  setSavedAsFav(false);
                  setIsNotGoing(false);
                  setIsGoing(false);
                  setEventId('');
                }}
              >
                Close Detail
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EventDetail;
