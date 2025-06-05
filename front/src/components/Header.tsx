// // import { Link, useNavigate } from 'react-router-dom';
// // import { useEffect, useState } from 'react';

// // const Header = () => {
// //   const [currentUser, setCurrentUser] = useState<string | null>(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const storedUserStr = localStorage.getItem("currentUser");
// //     const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
// //     setCurrentUser(storedUser);
// //   }, []);

// //   const logout = () => {
// //     localStorage.removeItem("currentUser");
// //     setCurrentUser(null);
// //     navigate("/RegisterOrLogin");
// //   };

// //   return (
// //     <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
// //       <h1 className="text-xl font-bold">
// //         <Link to="/">Interior Inspiration</Link>
// //       </h1>
// //       <nav className="space-x-4 flex items-center">
// //         <Link to="/" className="hover:underline">בית</Link>
// //         <Link to="/gallery" className="hover:underline">גלריה</Link>
// //         <Link to="/about" className="hover:underline">אודות</Link>
// //         <Link to="/favorites" className="hover:underline">מועדפים</Link>
// //         {currentUser ? (
// //           <div className="flex items-center space-x-2" dir="rtl">
// //             <span>שלום, {currentUser}</span>
// //             <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
// //               התנתק
// //             </button>
// //           </div>
// //         ) : (
// //           <Link to="/RegisterOrLogin" className="hover:underline">התחברות / הרשמה</Link>
// //         )}
// //       </nav>
// //     </header>
// //   );
// // };

// // export default Header;


// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const Header = () => {
//   const [currentUser, setCurrentUser] = useState<string | null>(localStorage.getItem("currentUser"));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const storedUser = localStorage.getItem("currentUser");
//       setCurrentUser(storedUser);
//     }, 500); // בודק כל חצי שנייה אם יש שינוי

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold">
//         <Link to="/">Interior Inspiration</Link>
//       </h1>
//       <nav className="space-x-4 flex items-center">
//         <Link to="/" className="hover:underline">בית</Link>
//         <Link to="/gallery" className="hover:underline">גלריה</Link>
//         <Link to="/about" className="hover:underline">אודות</Link>
//         <Link to="/favorites" className="hover:underline">מועדפים</Link>
//         {currentUser ? (
//           <span className="ml-4" dir="rtl">שלום, {currentUser}</span>
//         ) : (
//           <Link to="/RegisterOrLogin" className="hover:underline">התחברות / הרשמה</Link>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;
















// import { Link, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const Header = () => {
//   const [currentUser, setCurrentUser] = useState<string | null>(localStorage.getItem("currentUser"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const storedUser = localStorage.getItem("currentUser");
//       setCurrentUser(storedUser);
//     }, 500); // בודק כל חצי שנייה אם יש שינוי

//     return () => clearInterval(interval);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     setCurrentUser(null);
//     navigate("/");
//   };

//   return (
//     <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold">
//         <Link to="/">Interior Inspiration</Link>
//       </h1>
//       <nav className="space-x-4 flex items-center">
//         <Link to="/" className="hover:underline">בית</Link>
//         <Link to="/gallery" className="hover:underline">גלריה</Link>
//         <Link to="/about" className="hover:underline">אודות</Link>
//         <Link to="/favorites" className="hover:underline">מועדפים</Link>
//         {currentUser ? (
//           <>
//             <span className="ml-4" dir="rtl">שלום, {currentUser.userName}</span>
//             <button
//               onClick={handleLogout}
//               className="ml-2 text-sm bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
//             >
//               התנתק
//             </button>
//           </>
//         ) : (
//           <Link to="/RegisterOrLogin" className="hover:underline">התחברות / הרשמה</Link>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RegisterOrLogin from '../pages/RegisterOrLogin';


type User = {
  userName: string;
};

const Header = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const storedUserStr = localStorage.getItem("currentUser");
      if (storedUserStr) {
        try {
          const parsedUser: User = JSON.parse(storedUserStr);
          setCurrentUser(parsedUser);
        } catch (e) {
          console.error("Failed to parse user:", e);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    loadUser(); // טוען מיד
    const interval = setInterval(loadUser, 500); // טוען שוב כל חצי שנייה

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  };
 

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Interior Inspiration</Link>
      </h1>
      <nav className="space-x-4 flex items-center">
        <Link to="/" className="hover:underline">בית</Link>
        <Link to="/gallery" className="hover:underline">גלריה</Link>
        <Link to="/about" className="hover:underline">אודות</Link>
        <Link to="/favorites" className="hover:underline">מועדפים</Link>
        {currentUser ? (
          <div className="flex items-center space-x-2" dir="rtl">
            <span> שלום {currentUser.userName}! </span>
            <button
              onClick={handleLogout}
              className="ml-2 text-sm bg-gray-500 hover:bg-zinc-600 px-2 py-1 rounded"
            >
                התנתק  
            </button>
            
          </div>
        ) : (
          <Link to="/RegisterOrLogin" className="hover:underline">התחברות / הרשמה</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
