
import React from "react";
import { useNavigate } from "react-router-dom";
import mainImg from '../Photos/room.jpg'; // שימי כאן את התמונה הגדולה שלך
import kitchenImg from '../Photos/_מטבח.jpg';
import bedroomImg from '../Photos/122.png';
import kidsroomImg from '../Photos/חדר נסיכה צבעוני של ילדה.png';
import livingroomImg from '../Photos/123.png';
import gardenImg from '../Photos/333.png';
import bathroomImg from '../Photos/456.webp';
import { useEffect } from "react";

const rooms = [
  { name: "חדר ילדים", img: kidsroomImg },
  { name: "סלון", img: livingroomImg },
  { name: "מטבח", img: kitchenImg },
  { name: "חדר שינה", img: bedroomImg },
  { name: "חצר", img: gardenImg },
  { name: "חדר רחצה", img: bathroomImg },
];


const Home = () => {

 useEffect(() => {
    // fetch('http://localhost:5000/')
    //   .then(res => res.text())
    //   .then(data => console.log('✅ תקשורת עם השרת:', data))
    //   .catch(err => console.error('❌ שגיאה בחיבור לשרת:', err));
    fetch(`${process.env.REACT_APP_API_URL}/`)
  .then(res => res.text())
  .then(data => console.log('✅ תקשורת עם השרת:', data))
    .catch(err => console.error('❌ שגיאה בחיבור לשרת:', err));


  }, []);

console.log('🔍 API URL:', process.env.REACT_APP_API_URL);




  const navigate = useNavigate();

  const handleClick = (room: string) => {
    navigate(`/gallery?room=${encodeURIComponent(room)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
     {/* אזור תמונת פתיחה */}
<div
  className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center"
  style={{ backgroundImage: `url(${mainImg})` }}
>
<div className="absolute inset-0 bg-white/20 flex flex-col justify-start items-center text-center px-4 pt-24 md:pt-32">
    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 drop-shadow-sm">
גלריית השראה לעיצוב פנים    </h1>
    <p className="text-lg md:text-xl text-slate-700 font-semibold drop-shadow-sm">
      כאן תוכלו לקבל השראה לעיצוב בית החלומות שלכם
    </p>
  </div>
</div>

      {/* אזור הקטגוריות */}
      <div className="p-6 bg-gray-100">
        
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {rooms.map((room) => (
    <div
      key={room.name}
      onClick={() => handleClick(room.name)}
      className="cursor-pointer border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
    >
      <img
        src={room.img}
        alt={room.name}
        className="w-full h-64 object-cover" // <- שינוי הגובה כאן ל־h-64
      />
      <div className="p-4 text-center font-semibold text-lg bg-purple-100 text-purple-900">
        {room.name}
      </div>
    </div>
  ))}
</div> */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {rooms.map((room) => (
    <div
      key={room.name}
      onClick={() => handleClick(room.name)}
      className="cursor-pointer bg-white bg-opacity-60 shadow hover:shadow-md transition rounded-md overflow-hidden"
    >
      {/* תמונה */}
      <div>
        <img
          src={room.img}
          alt={room.name}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* כיתוב על רקע סגול בהיר */}
      <div className="mt-4 bg-purple-100 text-purple-900 text-center font-semibold text-lg py-3">
        {room.name}
      </div>
    </div>
  ))}
</div>



      </div>
    </div>
  );
};

export default Home;
