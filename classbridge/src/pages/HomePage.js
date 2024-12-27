// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//   const [classroomsCreatedByMe, setClassroomsCreatedByMe] = useState([]);
//   const [classroomsJoinedByMe, setClassroomsJoinedByMe] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [classroomName, setClassroomName] = useState("");
//   const [description, setDescription] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_API_BASE_URL}/auth/getuser`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );
//         const data = await response.json();
//         if (response.ok) {
//           setUser(data.data);
//         } else {
//           toast.error(data.message || "Failed to fetch user data");
//         }
//       } catch (error) {
//         toast.error("An error occurred while fetching user data");
//       }
//     };
//     fetchUser();
//   }, []);

//   const fetchClassrooms = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_BASE_URL}/class/classroomscreatedbyme`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );

//       const data = await response.json();
//       if (response.ok) {
//         setClassroomsCreatedByMe(data.data);
//       } else {
//         toast.error(data.message || "Failed to fetch classrooms");
//       }
//     } catch (error) {
//       toast.error("An error occurred while fetching classrooms");
//     }
//   };

//   const fetchClassroomsJoinedByMe = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_BASE_URL}/class/classroomsforstudent`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );

//       const data = await response.json();
//       if (response.ok) {
//         setClassroomsJoinedByMe(data.data);
//       }
//     } catch (error) {
//       toast.error("An error occurred while fetching joined classrooms");
//     }
//   };

//   const handleCreateClassroom = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_BASE_URL}/class/create`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: classroomName,
//             description,
//           }),
//           credentials: "include",
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Classroom created successfully");
//         setClassroomName("");
//         setDescription("");
//         setShowPopup(false);
//         fetchClassrooms();
//       } else {
//         toast.error(data.message || "Failed to create classroom");
//       }
//     } catch (error) {
//       toast.error("An error occurred while creating classroom");
//     }
//   };

//   const navigate = useNavigate();

//   const handleRowClick = (classroomId) => {
//     navigate(`/classes/${classroomId}`);
//   };

//   useEffect(() => {
//     if (user) {
//       fetchClassrooms();
//       fetchClassroomsJoinedByMe();
//     }
//   }, [user]);

//   return (
//     <div className="home-page">
//       <h1>Welcome, {user ? user.name : "User"}</h1>
//       {user && user.role === "teacher" && (
//         <>
//           <button
//             className="create-classroom-btn"
//             onClick={() => setShowPopup(true)}
//           >
//             Create Classroom
//           </button>
//           {showPopup && (
//             <div className="popup-overlay">
//               <div className="popup-content">
//                 <h3>Create Classroom</h3>
//                 <input
//                   type="text"
//                   placeholder="Classroom Name"
//                   value={classroomName}
//                   onChange={(e) => setClassroomName(e.target.value)}
//                 />
//                 <textarea
//                   placeholder="Description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <div className="popup-buttons">
//                   <button onClick={handleCreateClassroom}>Submit</button>
//                   <button onClick={() => setShowPopup(false)}>Cancel</button>
//                 </div>
//               </div>
//             </div>
//           )}
//           <div className="classroom-list">
//             <h3>Classrooms created by me</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Description</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {classroomsCreatedByMe.map((classroom) => (
//                   <tr
//                     key={classroom._id}
//                     onClick={() => handleRowClick(classroom._id)}
//                   >
//                     <td>{classroom.name}</td>
//                     <td>{classroom.description}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//       <div className="classroom-list">
//         <h3>Classrooms joined by me</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {classroomsJoinedByMe.map((classroom) => (
//               <tr
//                 key={classroom._id}
//                 onClick={() => handleRowClick(classroom._id)}
//                 className="clickable-row"
//               >
//                 <td>{classroom.name}</td>
//                 <td>{classroom.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";  

const HomePage = () => {
  const [classroomsCreatedByMe, setClassroomsCreatedByMe] = useState([]);
  const [classroomsJoinedByMe, setClassroomsJoinedByMe] = useState([]);
  const [allClassrooms, setAllClassrooms] = useState([]); // New state for all classrooms
  const [showPopup, setShowPopup] = useState(false);
  const [classroomName, setClassroomName] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/auth/getuser`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUser(data.data);
        } else {
          toast.error(data.message || "Failed to fetch user data");
        }
      } catch (error) {
        toast.error("An error occurred while fetching user data");
      }
    };
    fetchUser();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/class/classroomscreatedbyme`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setClassroomsCreatedByMe(data.data);
      } else {
        toast.error(data.message || "Failed to fetch classrooms");
      }
    } catch (error) {
      toast.error("An error occurred while fetching classrooms");
    }
  };

  const fetchClassroomsJoinedByMe = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/class/classroomsforstudent`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setClassroomsJoinedByMe(data.data);
      }
    } catch (error) {
      toast.error("An error occurred while fetching joined classrooms");
    }
  };

  const fetchAllClassrooms = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/class/allclassrooms`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setAllClassrooms(data.data); // Store all classrooms in state
      } else {
        toast.error(data.message || "Failed to fetch all classrooms");
      }
    } catch (error) {
      toast.error("An error occurred while fetching all classrooms");
    }
  };

  const handleCreateClassroom = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/class/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: classroomName,
            description,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Classroom created successfully");
        setClassroomName("");
        setDescription("");
        setShowPopup(false);
        fetchClassrooms(); // Refresh the list of classrooms created by the user
        fetchAllClassrooms(); // Refresh the list of all classrooms
      } else {
        toast.error(data.message || "Failed to create classroom");
      }
    } catch (error) {
      toast.error("An error occurred while creating classroom");
    }
  };

  const navigate = useNavigate();

  const handleRowClick = (classroomId) => {
    navigate(`/classes/${classroomId}`);
  };

  useEffect(() => {
    if (user) {
      fetchClassrooms();
      fetchClassroomsJoinedByMe();
      fetchAllClassrooms(); // Fetch all classrooms on page load
    }
  }, [user]);

  return (
    <div className="home-page">
      <h1>Welcome, {user ? user.name : "User"}</h1>
      {user && user.role === "teacher" && (
        <>
          <button
            className="create-classroom-btn"
            onClick={() => setShowPopup(true)}
          >
            Create Classroom
          </button>
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3>Create Classroom</h3>
                <input
                  type="text"
                  placeholder="Classroom Name"
                  value={classroomName}
                  onChange={(e) => setClassroomName(e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="popup-buttons">
                  <button onClick={handleCreateClassroom}>Submit</button>
                  <button onClick={() => setShowPopup(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
          <div className="classroom-list">
            <h3>Classrooms created by me</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {classroomsCreatedByMe.map((classroom) => (
                  <tr
                    key={classroom._id}
                    onClick={() => handleRowClick(classroom._id)}
                  >
                    <td>{classroom.name}</td>
                    <td>{classroom.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="classroom-list">
        <h3>Classrooms joined by me</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {classroomsJoinedByMe.map((classroom) => (
              <tr
                key={classroom._id}
                onClick={() => handleRowClick(classroom._id)}
                className="clickable-row"
              >
                <td>{classroom.name}</td>
                <td>{classroom.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Section for All Classrooms */}
      <div className="classroom-list">
        <h3>All Available Classrooms</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {allClassrooms.map((classroom) => (
              <tr
                key={classroom._id}
                onClick={() => handleRowClick(classroom._id)}
                className="clickable-row"
              >
                <td>{classroom.name}</td>
                <td>{classroom.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
