import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const CreateEventWithInvite = ({
  users,
  auth,
  setAuth,
  setEvents,
  events,
  headers,
}) => {
  // const [seen, setSeen] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');
  const [error, setError] = useState('');
  const [isInvited, setIsInvited] = useState(false);
  const [event, setEvent] = useState({
    name: '',
    date: moment().format('YYYY-MM-DDTHH:mm'),
    location: '',
    description: '',
    isPublic: false,
    userId: auth.id,
  });

  const userToInvite = users.find((user) => user.username === 'moe');
  console.log(userToInvite);
  //once event is created go to a specific page
  const history = useHistory();
  const goToFreinds = () => history.push('/search/results');

  const onChange = (ev) => {
    const change = {};
    change[ev.target.name] =
      ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    setEvent({ ...event, ...change });
  };

  const createEvent = (activity) => {
    axios.post(`/api/events`, activity).then((response) => {
      console.log(response.data, 'response data');
      const newEvent = response.data;
      setEvent(response.data);
      const createUserEvent = {
        joinedUserId: userToInvite.id, //this needs to be changed to the user that erica gives me
        eventId: newEvent.id,
        status: 'invited',
      };
      if (isInvited) {
        axios.post(`/api/user_events`, createUserEvent).then((response) => {
          console.log(response.data, 'user ivent created');
        });
      }
    });
    //do I need this?
    axios
      .get('/api/events', headers())
      .then((response) => setEvents(response.data));
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    //console.log(event, 'event');
    createEvent(event);
    //need to have page working
    //goToFreinds();
  };
  //console.log(isInvited, 'isInvited');
  return (
    <div className="container-sm">
      <h1>Create Event with Private Invite</h1>
      <form className="w-50" onSubmit={onSubmit}>
        <div className="row form-group">
          <div className="col">
            <input
              name="name"
              value={event.name}
              type="text"
              className="form-control"
              placeholder="Activity name"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            name="date"
            value={event.date}
            className="form-control"
            type="datetime-local"
            placeholder="Set date"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            name="location"
            value={event.location}
            className="form-control"
            type="text"
            placeholder="Location"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="description"
            value={event.description}
            type="text"
            placeholder="Description"
            onChange={onChange}
          ></textarea>
        </div>
        {/* <div className="custom-control custom-checkbox my-1 mr-sm-2">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customControlInline"
            name="isPublic"
            checked={event.isPublic}
            onChange={onChange}
          />
          <label className="custom-control-label" htmlFor="customControlInline">
            Make it public
          </label>
        </div> */}
        <div className="custom-control custom-checkbox my-1 mr-sm-2">
          <input
            type="checkbox"
            className="custom-control-input"
            id="invite"
            value={isInvited}
            name="isInvited"
            checked={isInvited}
            onChange={(ev) => setIsInvited(ev.target.checked)}
          />
          <label className="custom-control-label" htmlFor="invite">
            Invite User
          </label>
        </div>
        <button
          className="btn btn-primary"
          disabled={!event.name || !event.location}
        >
          Create Event
        </button>
        {/* Change link once you know where it will go */}
        <Link to="/meetups" className="btn">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default CreateEventWithInvite;
