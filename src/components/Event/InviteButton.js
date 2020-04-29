import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function InviteButton({
  // savedAsFav,
  // auth,
  inviteUser,
  eventDetail,
  users,
}) {
  const [selectedUserId, setSelectedUserId] = useState('');
  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">
            Select User to Invite
          </label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value={''}>select a friend</option>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </div>
      </form>

      <button
        // to="/my/meetups"
        className="btn btn-secondary"
        disabled={!selectedUserId}
        onClick={() => {
          inviteUser({
            joinedUserId: selectedUserId,
            eventId: eventDetail.id,
            status: 'invited',
          });
        }}
      >
        Invite
      </button>
    </div>
  );
}
