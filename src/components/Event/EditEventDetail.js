import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export default function EditEventDetail({
  eventDetail,
  setEventDetail,
  setRenderEventEdit,
  setEvents,
  headers,
  auth,
}) {
  const [cancelMessage, setCancelMessage] = useState('');
  const [error, setError] = useState('');
  const [event, setEvent] = useState(eventDetail);

  const onChange = (ev) => {
    const change = {};
    change[ev.target.name] =
      ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    setEvent({ ...event, ...change });
  };

  const updateEvent = (activity) => {
    axios.put(`/api/events/${activity.id}`, activity).then((response) => {
      setEvent(response.data);
      setEventDetail(response.data);
    });
    axios.get('/api/events', headers()).then((response) => {
      setEvents(response.data);
      setRenderEventEdit('');
    });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    updateEvent(event);
  };
  return (
    <div className="container-sm">
      <h1>Update Event</h1>
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
          Update Event
        </button>
      </form>
      <button onClick={() => setRenderEventEdit('')} className="btn btn-light">
        Cancel
      </button>
      {/* <UpdatePopUp onSubmit={onSubmit} setCancelMessage={setCancelMessage} /> */}
      {/* {!seen ? <UpdatePopUp onSubmit={onSubmit} setSeen={setSeen} /> : null} */}
    </div>
  );
}
