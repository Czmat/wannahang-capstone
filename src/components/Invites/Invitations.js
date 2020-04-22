import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import InvitationDetail from './InvitationDetail';

export default function Invitations({ headers, auth, userEvents }) {
  const [invites, setInvites] = useState([]);
  //const [showDetail, setShowDetail] = useState('');
  const [inviteDetail, setInviteDetail] = useState('');
  console.log(invites, 'invites', userEvents);

  useEffect(() => {
    axios
      .get(`/api/invites/${auth.id}`)
      .then((response) => setInvites(response.data));
  }, []);

  if (inviteDetail) {
    return (
      <div>
        <InvitationDetail
          inviteDetail={inviteDetail}
          setInviteDetail={setInviteDetail}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h5>You have been invited to {invites.length} events</h5>
        {invites.map((invite) => {
          return (
            <div key={invite.id}>
              <div
                className="card border-light mb-3"
                style={{ maxWidth: '18rem' }}
              >
                <div className="card-header">{invite.name}</div>
                <div className="card-body">
                  <h5 className="card-title">Location: {invite.location}</h5>
                  <p className="card-text">
                    {moment(invite.date).format('MMMM Do YYYY, h:mm a')}
                  </p>
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
      </div>
    );
  }
}
