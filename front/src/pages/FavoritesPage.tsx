// // 



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// // ❌ הסר את השורה הזו – כי התמונות מגיעות מהשרת, לא מקובץ data
// import { images, ImageData } from "../data";

// const FavoritesPage = () => {
//   const [favorites, setFavorites] = useState<string[]>([]);
//   const [images, setImages] = useState<any[]>([]); // תמונות שנטענו מהשרת

//   useEffect(() => {
//     const rawUser = localStorage.getItem("currentUser");
//     if (rawUser) {
//       try {
//         const currentUser = JSON.parse(rawUser);
//         const favoritesKey = `favorites_${currentUser.userName}`;
//         const storedFavorites = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
//         setFavorites(storedFavorites);
//       } catch (err) {
//         console.error("שגיאה בקריאת המשתמש או המועדפים:", err);
//       }
//     }
//   }, []);

//   // ✅ בקשת GET לשרת כדי לקבל את כל התמונות ממונגו
//   useEffect(() => {
//     fetch("/api/images") // ודא שהנתיב הזה נכון לשרת שלך
//       .then((res) => res.json())
//       .then((data) => setImages(data))
//       .catch((err) => console.error("שגיאה בטעינת התמונות:", err));
//   }, []);

//   // סינון לפי מזהי המועדפים
//   const filteredImages = images.filter((img) => favorites.includes(img.id));

//   return (
//     <div className="gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
//       {filteredImages.length > 0 ? (
//         filteredImages.map((img) => (
//           <div
//             key={img.id}
//             className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden relative"
//           >
//             <Link to={`/gallery/${img.id}`}>
//               <img
//                 src={img.imageUrl}
//                 alt={img.title}
//                 className="w-full h-60 object-cover"
//               />
//             </Link>
//             <div className="p-4">
//               <h2 className="text-lg font-semibold">{img.title}</h2>
//               <p className="text-sm text-gray-600">
//                 {img.room} | {img.styles?.join(", ")}
//               </p>
//               {img.designer && (
//                 <p className="text-xs text-gray-400 mt-1">
//                   עיצוב: {img.designer}
//                 </p>
//               )}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p style={{ textAlign: "center" }}>לא נמצאו מועדפים</p>
//       )}
//     </div>
//   );
// };

// export default FavoritesPage;










import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { images, ImageData } from "../data"; // עדכון 1: ייבוא הנתונים מהמקום הנכון

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const rawUser = localStorage.getItem("currentUser");
    if (rawUser) {
      try {
        const currentUser = JSON.parse(rawUser);
        const favoritesKey = `favorites_${currentUser.userName}`;
        const storedFavorites = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
        setFavorites(storedFavorites);
      } catch (err) {
        console.error("שגיאה בקריאת המשתמש או המועדפים:", err);
      }
    }
  }, []);

  // עדכון 2: סינון התמונות ישירות מהמערך המיובא
  const filteredImages = images.filter((img) => favorites.includes(img.id)); // גם id וגם favorites הם string

  return (
    <div className="gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {filteredImages.length > 0 ? (
        filteredImages.map((img) => (
          <div
            key={img.id}
            className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden relative"
          >
            <Link to={`/gallery/${img.id}`}>
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-60 object-cover"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{img.title}</h2>
              <p className="text-sm text-gray-600">
                {img.room} | {img.styles.join(", ")}
              </p>
              {img.designer && (
                <p className="text-xs text-gray-400 mt-1">
                  עיצוב: {img.designer}
                </p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>לא נמצאו מועדפים</p>
      )}
    </div>
  );
};

export default FavoritesPage;

