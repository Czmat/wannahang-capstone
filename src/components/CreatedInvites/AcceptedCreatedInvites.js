import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function AcceptedCreatedInvites({
  setInviteDetail,
  acceptedInvites,
}) {
  return (
    <div>
      <h5>I have {acceptedInvites.length} accepted events</h5>
      {acceptedInvites.map((invite) => {
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
        );
      })}
    </div>
  );
}
