import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import InvitationDetail from "./InvitationDetail";
import AcceptedInvites from "./AcceptedInvites";
import DeclinedInvites from "./DeclinedInvites";

export default function Invitations({
  headers,
  auth,
  userEvents,
  events,
  setEvents,
  setInvitesCount,
}) {
  const [invites, setInvites] = useState([]);
  //const [showDetail, setShowDetail] = useState('');
  const [inviteDetail, setInviteDetail] = useState("");

  useEffect(() => {
    //console.log(inviteDetail, 'inviteDetail');
    axios
      .get(`/api/invites/${auth.id}`)
      .then((response) => setInvites(response.data));
  }, [inviteDetail]);
  //console.log(invites, 'invites', userEvents);

  const invitations = invites.filter((invite) => invite.status === "invited");
  //console.log(invitations, 'status invited');

  useEffect(() => {
    setInvitesCount(invitations.length);

    //console.log(inviteDetail, 'inviteDetail');
  }, [invitations]);

  const acceptedInvites = invites.filter(
    (invite) => invite.status === "accepted"
  );
  // console.log(acceptedInvites, 'status accepted');

  const declinedInvites = invites.filter(
    (invite) => invite.status === "declined"
  );
  //console.log(declinedInvites, 'status declined');

  if (inviteDetail) {
    return (
      <div>
        <InvitationDetail
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
        <h5>I have been invited to {invitations.length} events</h5>
        {invitations.map((invite) => {
          return (
            <div key={invite.id}>
              <div
                className="card border-light mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header">{invite.name}</div>
                <div className="card-body">
                  <h5 className="card-title">Location: {invite.location}</h5>
                  <p className="card-text">
                    {moment(invite.date).format("MMMM Do YYYY, h:mm a")}
                  </p>
                  {invite.isAccepted ? <p>I accepted </p> : <p>not going</p>}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setInviteDetail(invite);
                      //setShowDetail(true);
                    }}
                  >
                    view Detail
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div>
          {acceptedInvites ? (
            <AcceptedInvites
              acceptedInvites={acceptedInvites}
              setInviteDetail={setInviteDetail}
            />
          ) : (
            <p>I have no accepted invites</p>
          )}
        </div>
        <div>
          {declinedInvites ? (
            <DeclinedInvites
              declinedInvites={declinedInvites}
              setInviteDetail={setInviteDetail}
            />
          ) : (
            <p>I have no declined invites</p>
          )}
        </div>
      </div>
    );
  }
}
