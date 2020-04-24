import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const UpdatePopUp = ({ onSubmit }) => {
  const history = useHistory();
  const goEdited = () => history.push('/UserProfile');
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Are you sure you want to update?
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
          <div className="modal-body">Reminder: you are about to update.</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              to="/useraccount"
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => {
                onSubmit();
                goEdited();
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdatePopUp;
