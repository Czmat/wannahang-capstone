import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import UserDetailPopUp from '../User/UserDetailPopUp';

export default function InvitationDetail({ inviteDetail, setInviteDetail }) {
  return (
    <div>
      <h5>Invite Detail</h5>

      <div className="card border-light mb-3" style={{ maxWidth: '20rem' }}>
        <div className="card-header">
          {inviteDetail.name}{' '}
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => setInviteDetail('')}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="card-body">
          <h5 className="card-title">Location: {inviteDetail.location}</h5>
          <p className="card-text">
            Date: {moment(inviteDetail.date).format('MMMM Do YYYY, h:mm a')}
          </p>
          <p className="card-text">Detail: {inviteDetail.description}</p>
          <p className="card-text">
            Invited by{' '}
            {/* <button
              type="button"
              className="card-link"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              {inviteDetail.username}
            </button> */}
            <Link
              to="/invites"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={() => console.log('user')}
            >
              {inviteDetail.username}
            </Link>{' '}
          </p>

          <button
            className="btn btn-primary"
            onClick={() => {
              //acceptInvite({})
              console.log(inviteDetail.id, 'accept invite');
            }}
          >
            accept invite
          </button>
        </div>
      </div>
      <UserDetailPopUp inviteDetail={inviteDetail} />
    </div>
  );
}
