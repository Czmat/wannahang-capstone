import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const CreateEvent = ({ auth, setAuth, setEvents, events, headers }) => {
  // const [seen, setSeen] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');
  const [error, setError] = useState('');
  const [event, setEvent] = useState({
    name: '',
    date: new Date(), //moment().format('MMMM Do YYYY, h:mm:ss a'),
    location: '',
    description: '',
    isPublic: true,
    userId: auth.id,
  });

  // useEffect(() => {
  //   console.log('use effect');
  // }, [auth]);

  const onChange = (ev) => {
    const change = {};
    change[ev.target.name] =
      ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    setEvent({ ...event, ...change });
  };

  const createEvent = (activity) => {
    axios.post(`/api/events`, activity).then((response) => {
      console.log(response.data, 'response data');
      setEvent(response.data);
    });
    axios
      .get('/api/events', headers())
      .then((response) => setEvents(response.data));
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log(event, 'event');
    createEvent(event);
  };
  //console.log(new Date().toLocaleString(), 'event');
  return (
    <div className="container-sm">
      <h1>Create Event</h1>
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
        <div className="custom-control custom-checkbox my-1 mr-sm-2">
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
        </div>
        <button
          //type="button"
          className="btn btn-primary"
          // data-toggle="modal"
          // data-target="#exampleModal"
        >
          Create Event
        </button>
        <Link to="/meetups" className="btn">
          Cancel
        </Link>
      </form>
      {/* <UpdatePopUp onSubmit={onSubmit} setCancelMessage={setCancelMessage} /> */}
      {/* {!seen ? <UpdatePopUp onSubmit={onSubmit} setSeen={setSeen} /> : null} */}
    </div>
  );
};

export default CreateEvent;
