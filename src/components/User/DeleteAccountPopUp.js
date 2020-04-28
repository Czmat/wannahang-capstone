import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const DeleteAccountPopUp = ({ logout, auth }) => {
  const history = useHistory();
  const goToDeleted = () => history.push('');

  const deleteAccount = () => {
    axios
      .delete(`/api/delete/user/${auth.id}`)
      .then(() => console.log('Goodbye'));
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-backdrop="static"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Are you sure you want to delete?
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            We had people about to delete but they changed their mind and they
            had success finding a partner for an event
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => {
                deleteAccount();
                logout();
                goToDeleted();
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteAccountPopUp;
