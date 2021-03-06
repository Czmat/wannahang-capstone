import React from 'react';

export default function SearchResultAboutModal({
  aboutMe,
  removeFromFavorites,
  auth,
}) {
  return (
    <div
      className="modal fade"
      id="exampleModalNotFav"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Details of user {aboutMe.username}. Remove from favorite?
            </h5>
            {/* =======FAVE X BTN======= */}

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                removeFromFavorites({
                  userId: auth.id,
                  favoriteId: aboutMe.userId,
                });
              }}
              data-dismiss="modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
