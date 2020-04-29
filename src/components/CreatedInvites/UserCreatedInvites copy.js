import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import CreatedInviteDetail from "./CreatedInviteDetail";
import AcceptedCreatedInvites from "./AcceptedCreatedInvites";
import DeclinedCreatedInvites from "./DeclinedCreatedInvites";
// import AcceptedInvites from './AcceptedInvites';
// import DeclinedInvites from './DeclinedInvites';

export default function UserCreatedInvites({
  headers,
  auth,
  userEvents,
  events,
  setEvents,
  setInvitesCount,
}) {
  const [createdInvites, setCreatedInvites] = useState([]);
  //const [showDetail, setShowDetail] = useState('');
  const [inviteDetail, setInviteDetail] = useState("");

  useEffect(() => {
    //console.log(inviteDetail, 'inviteDetail');
    axios
      .get(`/api/created/invites/${auth.id}`)
      .then((response) => setCreatedInvites(response.data));
  }, [inviteDetail]);
  // console.log(createdInvites, 'createdInvites', userEvents);

  const invitations = createdInvites.filter(
    (invite) => invite.status === "invited"
  );
  //console.log(invitations, 'status invited');

  const acceptedInvites = createdInvites.filter(
    (invite) => invite.status === "accepted"
  );
  // console.log(acceptedInvites, 'status accepted');

  const declinedInvites = createdInvites.filter(
    (invite) => invite.status === "declined"
  );
  //console.log(declinedInvites, 'status declined');

  if (inviteDetail) {
    return (
      <div>
        <CreatedInviteDetail
          inviteDetail={inviteDetail}
          setInviteDetail={setInviteDetail}
          events={events}
          setEvents={setEvents}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <h3 className="userName">
              I have created {invitations.length} invitations
            </h3>
          </div>
          <div className="row justify-content-center">
            {invitations.map((invite) => {
              return (
                <div key={invite.id} className="row justify-content-center">
                  <div className="card profile-card">
                    <div className="card-body">
                      <div className="card-header">{invite.name}</div>
                      <div className="card-body">
                        <h5 className="card-title">
                          Location: {invite.location}
                        </h5>
                        <p className="card-text">
                          {moment(invite.date).format("MMMM Do YYYY, h:mm a")}
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setInviteDetail(invite);
                            //setShowDetail(true);
                          }}
                        >
                          View Detail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="event-number">
            <div className="row justify-content-center">
              {acceptedInvites ? (
                <AcceptedCreatedInvites
                  acceptedInvites={acceptedInvites}
                  setInviteDetail={setInviteDetail}
                />
              ) : (
                <p>I have no accepted invitations</p>
              )}
            </div>

            <div className="row justify-content-center">
              {declinedInvites ? (
                <DeclinedCreatedInvites
                  declinedInvites={declinedInvites}
                  setInviteDetail={setInviteDetail}
                />
              ) : (
                <p>I have no declined invitations</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
