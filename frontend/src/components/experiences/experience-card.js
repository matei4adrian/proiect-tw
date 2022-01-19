import { useState } from "react";
import DeleteButton from "./delete-button";
import DeleteModal from "../modals/delete-modal";
import EditButton from "./edit-button";
import ReadMoreButton from "./read-more-button";
import ReadMoreModal from "../modals/read-more-modal";
import { useNavigate } from "react-router-dom";

const truncate = (str) => {
  return str.length > 40 ? str.substring(0, 40) + "..." : str;
};

const ExperienceCard = (props) => {
  const [showReadMoreModal, setShowReadMoreModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { experience, isMyExperiencePage, getMyExperiences, setErrorFetch } =
    props;
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClickReadMore = () => {
    setShowReadMoreModal(true);
  };

  const DeleteExperience = async () => {
    await fetch(
      `http://localhost:8080/api/users/${JSON.parse(user).id}/experiences/${
        experience.id
      }`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        getMyExperiences();
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorFetch(true);
      });
  };

  const handleClickDelete = () => {
    DeleteExperience();
    setShowDeleteModal(false);
  };

  const handleClickEdit = () => {
    navigate(`/my-experiences/${experience.id}`);
  };

  return (
    <div
      id={experience.author}
      className="w-full  experience-card bg-white rounded-lg p-12 flex flex-col justify-center items-center"
    >
      <div className="text-center">
        <p className="text-xl text-gray-700 font-bold mb-4">
          {experience.author}
        </p>
        <div className="flex justify-center items-center mb-1">
          <svg
            className="h-4 w-4 text-gray-400 mr-1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
          </svg>
          <p className="text-base text-gray-400 font-normal">
            From: {experience.startPoint}
          </p>
        </div>
        <div className="flex justify-center items-center mb-1">
          <svg
            className="h-4 w-4 text-gray-400 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <p className="text-base text-gray-400 font-normal">
            To: {experience.endPoint}
          </p>
        </div>
        <div className="flex justify-center items-center mb-1">
          <svg
            className="h-4 w-4 text-gray-400 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <circle cx="12" cy="12" r="10" />{" "}
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <p className="text-base text-gray-400 font-normal">
            Departure hour: {experience.departureHour}
          </p>
        </div>
        <div className="flex justify-center items-center mb-1">
          <svg
            className="h-4 w-4 text-gray-400 mr-1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />{" "}
            <path
              d="M11 19.95a8 8 0 0 1 -5.3 -12.8"
              strokeDasharray=".001 4.13"
            />
          </svg>
          <p className="text-base text-gray-400 font-normal">
            Duration: {experience.duration}
          </p>
        </div>
        <div className="flex justify-center items-center mb-1">
          <svg
            className="h-4 w-4 text-gray-400 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-base text-gray-400 font-normal">
            Agglomeration: {experience.agglomeration}
          </p>
        </div>
        <div className="flex justify-center items-center mb-1">
          <svg
            className="h-4 w-4 text-gray-400 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          </svg>
          <p className="text-base text-gray-400 font-normal">
            Satisfaction level: {experience.satisfactionLevel}
          </p>
        </div>
        <div className="flex justify-center items-center mb-1">
          <svg
            className="h-4 w-4 text-gray-400 mr-1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="6" cy="17" r="2" /> <circle cx="18" cy="17" r="2" />{" "}
            <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />{" "}
            <polyline points="16 5 17.5 12 22 12" />{" "}
            <line x1="2" y1="10" x2="17" y2="10" />{" "}
            <line x1="7" y1="5" x2="7" y2="10" />{" "}
            <line x1="12" y1="5" x2="12" y2="10" />
          </svg>
          <p className="text-base text-gray-400 font-normal">
            Vehicle type: {experience.vehicleType}
          </p>
        </div>
        <div className="flex justify-center items-center mb-1">
          <svg
            className="h-4 w-4 text-gray-400 mr-1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3" />{" "}
            <line x1="8" y1="9" x2="16" y2="9" />{" "}
            <line x1="8" y1="13" x2="14" y2="13" />
          </svg>
          <p className="text-base text-gray-400 font-normal">Observations:</p>
        </div>
        <p className="text-base break-all text-gray-400 font-normal mb-1">
          {truncate(experience.observations)}
        </p>

        <ReadMoreButton handleClick={handleClickReadMore} />
      </div>
      {isMyExperiencePage && (
        <div className="flex justify-center items-center space-x-4">
          <EditButton handleClick={handleClickEdit} />
          <DeleteButton setShowModal={setShowDeleteModal} />
        </div>
      )}
      <ReadMoreModal
        showModal={showReadMoreModal}
        setShowModal={setShowReadMoreModal}
        experience={experience}
      />
      <DeleteModal
        handleClick={handleClickDelete}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
      />
    </div>
  );
};
export default ExperienceCard;
