import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import EventDetail from './EventDetatil';

const RenderEvents = ({
  setEvents,
  events,
  users,
  auth,
  userEvents,
  setUserEvents,
}) => {
  const [eventId, setEventId] = useState('');
  const [savedAsFav, setSavedAsFav] = useState();
  const [isGoing, setIsGoing] = useState();
  const [isNotGoing, setIsNotGoing] = useState();

  const myUserEvents = userEvents.filter(
    (userEvent) => userEvent.joinedUserId === auth.id
  );
  const favoriteEvents = myUserEvents.filter((ue) => ue.isFavorite);
  const goingEvents = myUserEvents.filter((ue) => ue.status === 'accepted');
  const notGoingEvents = myUserEvents.filter((ue) => ue.status === 'declined');
  const publicEvents = events
    .filter((eve) => eve.userId !== auth.id)
    .filter((e) => e.isPublic);

  const displayEvents = events.filter((event) => {
    if (event.isAccepted) {
      for (let i = 0; i < goingEvents.length; i++) {
        if (goingEvents[i].eventId === event.id) {
          return event;
        }
      }
    }
    if (event.userId !== auth.id && event.isPublic && !event.isAccepted) {
      return event;
    }
  });

  return (
    <div>
      {eventId ? (
        <div>
          <EventDetail
            eventId={eventId}
            setEvents={setEvents}
            events={events}
            users={users}
            setEventId={setEventId}
            auth={auth}
            savedAsFav={savedAsFav}
            setSavedAsFav={setSavedAsFav}
            isGoing={isGoing}
            setIsGoing={setIsGoing}
            isNotGoing={isNotGoing}
            setIsNotGoing={setIsNotGoing}
            setUserEvents={setUserEvents}
            userEvents={userEvents}
            myUserEvents={myUserEvents}
          />
        </div>
      ) : (
        <div>
          <h1>Meetups ({displayEvents.length})</h1>
          {displayEvents.map((event) => {
            const foundFavEvent = favoriteEvents.find(
              (e) => e.eventId === event.id
            );
            const going = goingEvents.find((e) => e.eventId === event.id);
            const notGoing = notGoingEvents.find((e) => e.eventId === event.id);
            return (
              <div className="card" key={event.id} style={{ width: '18rem' }}>
                <div className="card-body">
                  <h3 className="card-title">{event.name}</h3>
                  <h6 className="card-title">
                    {moment(event.date).format('MMMM Do YYYY, h:mm a')}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {event.location}
                  </h6>
                  {foundFavEvent ? <h6>is favorite</h6> : ''}
                  {going ? <h6>is going</h6> : ''}
                  <button
                    className="card-link"
                    onClick={() => {
                      {
                        foundFavEvent ? setSavedAsFav(foundFavEvent) : null;
                      }
                      {
                        going ? setIsGoing(going) : null;
                      }
                      {
                        notGoing ? setIsNotGoing(notGoing) : null;
                      }
                      setEventId(event.id);
                    }}
                  >
                    View details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RenderEvents;
