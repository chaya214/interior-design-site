import { useParams } from "react-router-dom";
import { images, ImageData } from "../data";
import { useState } from "react";

const isLoggedIn = false; // להחליף בהמשך למצב אמיתי

export default function PhotoDetail() {
  const { id } = useParams();
  const photo = images.find((p) => p.id === id);
  const [favorited, setFavorited] = useState(false);

  if (!photo) return <div>תמונה לא נמצאה</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Image - גדלנו ל־3/5 */}
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="w-full md:w-4/5 h-auto rounded-lg shadow"
        />

        {/* Details - הצטמצמו ל־2/5 */}
        <div className="md:w-1/5 text-right">
          <h1 className="text-2xl font-bold">{photo.title}</h1>
          <p className="text-gray-700 mt-2">{photo.description}</p>
          <p className="mt-4">
            <strong>קטגוריה:</strong> {photo.room}
          </p>
          <p>
            <strong>סגנון:</strong> {photo.styles.join(", ")}
          </p>
          {photo.designer && (
            <p>
              <strong>מעצב:</strong> {photo.designer}
            </p>
          )}

          <button
            onClick={() => {
              if (!isLoggedIn) {
                alert("יש להתחבר כדי להוסיף למועדפים");
                return;
              }
              setFavorited(!favorited);
            }}
            className={`mt-6 px-4 py-2 rounded ${
              favorited ? "bg-red-500" : "bg-gray-300"
            } text-white`}
          >
            {favorited ? "הוסר מהמועדפים" : "הוסף למועדפים"}
          </button>
        </div>
      </div>
    </div>
  );
}
