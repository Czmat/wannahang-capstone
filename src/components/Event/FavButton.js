import React from 'react';

export default function FavButton({
  isGoing,
  auth,
  addToFavorites,
  savedAsFav,
  setSavedAsFav,
  removeFromFavorites,
  eventDetail,
}) {
  return (
    <div>
      {savedAsFav ? (
        <button
          className="btn btn-dark"
          onClick={() => {
            removeFromFavorites({ ...savedAsFav, isFavorite: false });
          }}
        >
          Favorite remove
        </button>
      ) : (
        <div>
          {isGoing ? (
            <button
              onClick={() => {
                addToFavorites({ ...isGoing, isFavorite: true });
              }}
              className="btn btn-dark"
            >
              store in favorites
            </button>
          ) : (
            <button
              onClick={() => {
                addToFavorites({
                  joinedUserId: auth.id,
                  eventId: eventDetail.id,
                  isFavorite: true,
                });
              }}
              className="btn btn-dark"
            >
              store in favorites
            </button>
          )}
        </div>
      )}
    </div>
  );
}
