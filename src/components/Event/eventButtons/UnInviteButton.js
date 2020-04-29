import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function UnInviteButton({
  unInviteUser,
  invitedUserEvent,
  invitedUser,
}) {
  return (
    <div>
      <p>
        I have invited <Link to="/my/meetups">{invitedUser.username}</Link>
      </p>
      <button
        className="btn btn-dark"
        onClick={() => {
          unInviteUser(invitedUserEvent.id);
        }}
      >
        uninvite
      </button>
    </div>
  );
}
