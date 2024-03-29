import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function AcceptedInvites({ setInviteDetail, acceptedInvites }) {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <h3 className="userName">
          I have accepted {acceptedInvites.length} events
        </h3>
      </div>
      {acceptedInvites.map((invite) => {
        return (
          <div key={invite.id} className="row justify-content-center">
            <div className="card profile-card invite-body">
              <div className="card-body invite-body">
                <div className="card-header invite-head-purple">
                  <h4>{invite.name}</h4>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Location: {invite.location}</h5>
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
                    view Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
