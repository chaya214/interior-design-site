

// import { Link, useLocation } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';

// type ImageData = {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl?: string;
//   url?: string;
//   room: string;
// };


// const getQueryParam = (search: string, key: string) => {
//   const params = new URLSearchParams(search);
//   return params.get(key);
// };

// type Filters = {
//   rooms: string[];  // עדיין משתמשים בזה כי אתה מסנן לפי חדרים
//   styles: string[]; // ולפי סגנונות
// };

// const Gallery = () => {
//   const location = useLocation();
//   const initialRoom = getQueryParam(location.search, 'room') || '';

//   const [filters, setFilters] = useState<Filters>({
//     rooms: initialRoom ? [initialRoom] : [],
//     styles: [],
//   });

//   const [favorites, setFavorites] = useState<string[]>([]);
//   const [images, setImages] = useState<ImageData[]>([]);

//   // טעינת התמונות מהשרת
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         // const response = await fetch("http://localhost:5000/api/images");
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/images`);

//         const data = await response.json();

//         setImages(data);
//               console.log("📦 תמונות שהגיעו:", data); // 👈 תוודא שזה מגיע

//       } catch (error) {
//         console.error("שגיאה בטעינת תמונות:", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
//     if (currentUser) {
//       const stored = localStorage.getItem(`favorites_${currentUser.userName}`);
//       if (stored) setFavorites(JSON.parse(stored));
//     }
//   }, []);

//   const handleToggle = (type: keyof Filters, value: string) => {
//     setFilters((prev) => {
//       const list = prev[type];
//       const newList = list.includes(value)
//         ? list.filter((v) => v !== value)
//         : [...list, value];
//       return {
//         ...prev,
//         [type]: newList,
//       };
//     });
//   };

//   const toggleFavorite = (photoId: string) => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
//     if (!currentUser) {
//       alert("עליך להתחבר כדי לשמור מועדפים.");
//       return;
//     }

//     let updatedFavorites: string[];
//     if (favorites.includes(photoId)) {
//       updatedFavorites = favorites.filter((id) => id !== photoId);
//     } else {
//       updatedFavorites = [...favorites, photoId];
//     }

//     setFavorites(updatedFavorites);
//     localStorage.setItem(`favorites_${currentUser.userName}`, JSON.stringify(updatedFavorites));
//   };

//   const roomOptions = ["מטבח", "חדר שינה", "חדר ילדים", "סלון", "חצר", "חדר רחצה"];
//   const styleOptions = ["מודרני", "מינימליסטי", "צבעוני", "נסיכי", "כפרי", "יוקרתי"];

//   // סינון לפי room ו-style – למרות שאין עדיין מידע כזה במסד, משאירים את זה לעתיד
//   const filteredImages = images.filter((img: ImageData) => {
//     const { rooms, styles } = filters;
//     const roomMatch = rooms.length === 0 || rooms.includes(img.room); // שדה category משמש כאן
//     const styleMatch = styles.length === 0; // עדיין אין styles במסד אז מתעלמים
//     return roomMatch && styleMatch;
//   });

//   return (
//     <div className="flex">
//       {/* Sidebar Filters */}
//       <div className="w-1/4 p-4 bg-gray-100">
//         <h3 className="font-bold mb-2">סינון לפי חדר:</h3>
//         {roomOptions.map((room) => (
//           <label key={room} className="block mb-1">
//             <input
//               type="checkbox"
//               checked={filters.rooms.includes(room)}
//               onChange={() => handleToggle("rooms", room)}
//             />
//             <span className="ml-2">{room}</span>
//           </label>
//         ))}

//         <h3 className="font-bold mt-4 mb-2">סינון לפי סגנון:</h3>
//         {styleOptions.map((style) => (
//           <label key={style} className="block mb-1">
//             <input
//               type="checkbox"
//               checked={filters.styles.includes(style)}
//               onChange={() => handleToggle("styles", style)}
//             />
//             <span className="ml-2">{style}</span>
//           </label>
//         ))}
//       </div>

//       {/* Gallery */}
//       <div className="w-3/4 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredImages.length > 0 ? (
//           filteredImages.map((img) => (
            
//             <div key={img.id} className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden relative">
//               <Link to={`/gallery/${img.id}`}>
//               <img src={img.imageUrl || img.url} alt={img.title}
//                                            className="w-full h-60 object-cover" />
                                           

//               </Link>
              
//               <button
//                 className="absolute top-2 left-2 text-2xl"
//                 onClick={() => toggleFavorite(img.id)}//כאן צריך לשנות שילך לתמונה האמיתית
//              // כנל למטה בשמירת מועדפים
//              >
//                 {favorites.includes(img.id) ? "❤️" : "🤍"}
//               </button>
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold">{img.title}</h2>
//                 {img.room && (
//                   <p className="text-sm text-gray-600">{img.room}</p>
//                 )}
//                 {img.description && (
//                   <p className="text-xs text-gray-400 mt-1">{img.description}</p>
//                 )}
//               </div>
//             </div>

//           ))
//         ) : (
//           <div className="col-span-full text-center text-gray-500">
//             לא נמצאו תמונות תואמות לסינון
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Gallery;














































/////////////////////////////////















import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { images, ImageData } from '../data';

const getQueryParam = (search: string, key: string) => {
  const params = new URLSearchParams(search);
  return params.get(key);
};

type Filters = {
  rooms: string[];
  styles: string[];
};

const Gallery = () => {
  const location = useLocation();
  const initialRoom = getQueryParam(location.search, 'room') || '';

  const [filters, setFilters] = useState<Filters>({
    rooms: initialRoom ? [initialRoom] : [],
    styles: [],
  });

  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      const stored = localStorage.getItem(`favorites_${currentUser.userName}`);
      if (stored) setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleToggle = (type: keyof Filters, value: string) => {
    setFilters((prev) => {
      const list = prev[type];
      const newList = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return {
        ...prev,
        [type]: newList,
      };
    });
  };

  const toggleFavorite = (photoId: string) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!currentUser) {
      alert("עליך להתחבר כדי לשמור מועדפים.");
      return;
    }

    let updatedFavorites: string[];
    if (favorites.includes(photoId)) {
      updatedFavorites = favorites.filter((id) => id !== photoId);
    } else {
      updatedFavorites = [...favorites, photoId];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${currentUser.userName}`, JSON.stringify(updatedFavorites));
  };

  const roomOptions = ["מטבח", "חדר שינה", "חדר ילדים", "סלון", "חצר", "חדר רחצה"];
  const styleOptions = ["מודרני", "מינימליסטי", "צבעוני", "נסיכי", "כפרי", "יוקרתי"];

  const filteredImages = images.filter((img: ImageData) => {
    const { rooms, styles } = filters;
    const roomMatch = rooms.length === 0 || rooms.includes(img.room);
    const styleMatch = styles.length === 0 || img.styles.some(style => styles.includes(style));
    return roomMatch && styleMatch;
  });

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <div className="w-1/4 p-4 bg-gray-100">
        <h3 className="font-bold mb-2">סינון לפי חדר:</h3>
        {roomOptions.map((room) => (
          <label key={room} className="block mb-1">
            <input
              type="checkbox"
              checked={filters.rooms.includes(room)}
              onChange={() => handleToggle("rooms", room)}
            />
            <span className="ml-2">{room}</span>
          </label>
        ))}

        <h3 className="font-bold mt-4 mb-2">סינון לפי סגנון:</h3>
        {styleOptions.map((style) => (
          <label key={style} className="block mb-1">
            <input
              type="checkbox"
              checked={filters.styles.includes(style)}
              onChange={() => handleToggle("styles", style)}
            />
            <span className="ml-2">{style}</span>
          </label>
        ))}
      </div>

      {/* Gallery */}
      <div className="w-3/4 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredImages.length > 0 ? (
          filteredImages.map((img) => (
            <div key={img.id} className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden relative">
              <Link to={`/gallery/${img.id}`}>
                <img src={img.imageUrl} alt={img.title} className="w-full h-60 object-cover" />
              </Link>
              <button
                className="absolute top-2 left-2 text-2xl"
                onClick={() => toggleFavorite(img.id)}
              >
                {favorites.includes(img.id) ? "❤️" : "🤍"}
              </button>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{img.title}</h2>
                <p className="text-sm text-gray-600">{img.room} | {img.styles.join(', ')}</p>
                {img.designer && <p className="text-xs text-gray-400 mt-1">עיצוב: {img.designer}</p>}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            לא נמצאו תמונות תואמות לסינון
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;



