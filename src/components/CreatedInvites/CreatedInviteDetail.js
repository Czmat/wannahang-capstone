import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import UserDetailPopUp from "../User/UserDetailPopUp";
import DeleteCreatedInvitePopUp from "./DeleteCreatedInvitePopUp";

export default function CreatedInviteDetail({
  inviteDetail,
  setInviteDetail,
  events,
  setEvents,
}) {
  const [isGoing, setIsGoing] = useState("");
  //console.log(isGoing, 'isGoing', inviteDetail);
  const deleteInvite = (userEventId) => {
    axios.delete(`/api/user_events/${inviteDetail.id}`).then(() => {
      // setUserEvents(
      //   myUserEvents.filter((_userEvent) => _userEvent.id !== isGoing.id)
      // );
      axios
        .delete(`/api/events/${inviteDetail.eventId}`)
        .then(() => setInviteDetail(""));
    });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h3 className="userName">The Whens and Wheres</h3>
        </div>{" "}
        <div className="row justify-content-center">
          <div className="card profile-card invite-body">
            <div className="card-body invite-body">
              <h4 className="card-header invite-head">
                {inviteDetail.name}
                <div className=" theX">
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => setInviteDetail("")}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </h4>

              <div className="card-body">
                <h5 className="card-title">
                  Location: {inviteDetail.location}
                </h5>
                <p className="card-text">
                  Date:{" "}
                  {moment(inviteDetail.date).format("MMMM Do YYYY, h:mm a")}
                </p>
                <p className="card-text">Detail: {inviteDetail.description}</p>
                <p className="card-text">
                  I invited{" "}
                  <Link
                    to="/invites"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => console.log("user")}
                  >
                    {inviteDetail.username}
                  </Link>{" "}
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Delete invite
                </button>
              </div>
            </div>
            <UserDetailPopUp inviteDetail={inviteDetail} />
            <DeleteCreatedInvitePopUp deleteInvite={deleteInvite} />
          </div>
        </div>
      </div>
    </div>
  );
}
