import React from "react";
import { Link } from "react-router-dom";

export default function SearchResultAboutModal({
  aboutMe,
  setAboutMe,
  inviteUser,
  goToCreateEvent,
  favorites,
  auth,
  addToFavorites,
  removeFromFavorites,
}) {
  const isFavorite = favorites.find((f) => f.favoriteId === aboutMe.userId);
  return (
    <div
      className="modal fade"
      id="exampleModalCenter2"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-body mb-0 p-0">
            <div className="embed-responsive profile-photo">
              <img src={aboutMe.srcBkgd} alt={aboutMe.username} />
            </div>
            {/* ====PROFILE PHOTO====== */}
            <div>
              <img
                className="profile-photo round-photo-inset"
                src={aboutMe.src}
                alt={aboutMe.username}
              />
            </div>
            <div className="about-user mb-3 mt-2">
              <h5>
                Hi! I am{" "}
                {aboutMe.username
                  ? aboutMe.username.charAt(0).toUpperCase() +
                    aboutMe.username.slice(1)
                  : ""}
                .
              </h5>
            </div>
            <div className="about-user mb-3 mt-2">
              <i>{aboutMe.about}</i>
            </div>
            <div className="about-user mb-2">
              My interests:
              <br />
              {/* ========REPLACE WITH HOBBIES========= */}
              <i>I like </i>
            </div>
            <div className="about-user mb-2">
              My stats:
              <br />
              <i>
                I love {aboutMe.pets}
                &nbsp;&bull;&nbsp;
                {aboutMe.political}
                &nbsp;&bull;&nbsp; {aboutMe.religion}
                &nbsp;&bull;&nbsp; {aboutMe.education}
                &nbsp;&bull;&nbsp; {aboutMe.careerName}
                &nbsp;&bull;&nbsp; {aboutMe.employment}
              </i>
            </div>
          </div>
          <div className="modal-footer justify-content-center flex-column flex-md-row">
            <span className="mr-4">Wanna Hang?</span>
            <div>
              <a className="px-2 fa-lg fb-ic">
                <i className="fab fa-facebook-f"></i>
              </a>

              <a className="px-2 fa-lg tw-ic">
                <i className="fab fa-twitter"></i>
              </a>

              <a className="px-2 fa-lg li-ic">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="px-2 fa-lg ins-ic mr-4">
                <i className="fab fa-instagram"></i>
              </a>
              {!isFavorite ? (
                <button
                  type="submit"
                  className="fas fa-heart fa-lg gray-modal"
                  onClick={() =>
                    addToFavorites({
                      userId: auth.id,
                      favoriteId: aboutMe.userId,
                    })
                  }
                  data-dismiss="modal"
                ></button>
              ) : (
                <button
                  type="submit"
                  className="fas fa-heart fa-lg red-modal" //this need a red heart
                  onClick={() =>
                    removeFromFavorites({
                      userId: auth.id,
                      favoriteId: aboutMe.userId,
                    })
                  }
                  data-dismiss="modal"
                ></button>
              )}
              <button
                type="button"
                className="btn-outline-success btn-rounded btn-sm mr-1"
                onClick={() => {
                  inviteUser({
                    id: aboutMe.userId,
                    name: aboutMe.username,
                  });
                  goToCreateEvent();
                }}
                data-dismiss="modal"
              >
                Invite?
              </button>
            </div>
            <button
              type="button"
              className="btn-outline-primary btn-rounded btn-sm"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
