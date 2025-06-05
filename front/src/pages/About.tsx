
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div
      className="min-h-[80vh] max-w-6xl mx-auto px-6 py-10 bg-purple-100"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* <h2 className="text-5xl font-extrabold text-center text-pink-700 mb-6 drop-shadow-xl font-nunito">
        אודות האתר
      </h2> */}

      <p className="text-xl text-center text-purple-800 font-medium mb-10 leading-relaxed max-w-3xl mx-auto">
        האתר שלנו מוקדש להשראה לעיצוב הבית בדגש על חדרי ילדים באווירה קסומה וחלומית, עם רוך, פסטליות, ותחושת בית עוטפת ונעימה.
      </p>

      <div className="flex justify-center gap-6 flex-wrap mb-10">
        <Link
          to=""
          className="bg-pink-300 hover:bg-pink-400 text-white px-6 py-3 rounded-full shadow-md transition duration-300"
        >
          עמוד ראשי
        </Link>
        <Link
          to="team"
          className="bg-purple-300 hover:bg-purple-400 text-white px-6 py-3 rounded-full shadow-md transition duration-300"
        >
          הצוות
        </Link>
        <Link
          to="contact"
          className="bg-indigo-300 hover:bg-indigo-400 text-white px-6 py-3 rounded-full shadow-md transition duration-300"
        >
          צור קשר
        </Link>
      </div>

      <div className="p-4">
        <Outlet />
      </div>
    </motion.div>
  );
}

export default About;
