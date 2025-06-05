
import React, { useState } from "react";
import { loginUser, saveUser, deletuser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function RegisterOrLogin() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();


 const deletMyUser = async () => {
  console.log("נכנס לפונקציה deletMyUser");

  if (userName !== "" && password !== "") {
    const response = await deletuser(userName, password);
    if (response.success) {
      alert("המשתמש נמחק בהצלחה");
      localStorage.removeItem("currentUser");
      navigate("/"); // ניתוב חזרה לדף הבית או למסך התחברות
    } else {
      alert(response.message || "לא הצליח למחוק את המשתמש");
    }
  } else {
    alert("יש למלא שם משתמש וסיסמה");
  }
};


  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const loginRes = await loginUser({ userName, password });
      if (loginRes.success) {
        localStorage.setItem("currentUser", JSON.stringify({ userName }));
        setMessage(`ברוך הבא, ${userName}`);
        // navigate("/");
      } else {
        setMessage(loginRes.message);
      }
    } else {
      const registerRes = await saveUser({ userName, email, password });
      if (registerRes.success) {
        localStorage.setItem("currentUser", JSON.stringify({ userName }));
        setMessage(`נרשמת בהצלחה וברוך הבא, ${userName}`);
        // navigate("/");
      } else {
        setMessage(registerRes.message);
      }
    }
  };
  const goToUsers = () => {
    navigate('/users');
  };

  return (
    <motion.div
      className="min-h-[90vh] max-w-7xl mx-auto px-6 py-12 bg-purple-100 flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex flex-col md:flex-row gap-10 w-full justify-center">
        {/* טופס התחברות */}
        <form
          onSubmit={handleAuth}
          className={`bg-purple-100 p-6 w-full max-w-md ${
            isLogin ? "" : "hidden"
          }`}
        >
          <h3 className="text-center text-2xl font-bold text-purple-900 mb-6">התחברות</h3>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="שם משתמש"
            required
            className="w-full p-3 mb-4 border border-purple-300 bg-purple-50 text-lg text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="סיסמה"
            required
            className="w-full p-3 mb-4 border border-purple-300 bg-purple-50 text-lg text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-none"
          />
          <button
            type="submit"
            className="w-full p-3 bg-purple-300 hover:bg-purple-400 text-white text-lg transition duration-300 rounded-none"
          >
            התחברות
          </button>
          {message && (
            <p className="text-center text-purple-800 mt-4 text-sm">{message}</p>
          )}
        </form>

        {/* טופס הרשמה */}
        <form
          onSubmit={handleAuth}
          className={`bg-purple-100 p-6 w-full max-w-md ${
            !isLogin ? "" : "hidden"
          }`}
        >
          <h3 className="text-center text-2xl font-bold text-purple-900 mb-6">הרשמה</h3>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="שם משתמש"
            required
            className="w-full p-3 mb-4 border border-purple-300 bg-purple-50 text-lg text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-none"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="אימייל"
            required
            className="w-full p-3 mb-4 border border-purple-300 bg-purple-50 text-lg text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="סיסמה"
            required
            className="w-full p-3 mb-4 border border-purple-300 bg-purple-50 text-lg text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-none"
          />
          <button
            type="submit"
            className="w-full p-3 bg-purple-300 hover:bg-purple-400 text-white text-lg transition duration-300 rounded-none"
          >
            הרשמה
          </button>
          {message && (
            <p className="text-center text-purple-800 mt-4 text-sm">{message}</p>
          )}
        </form>
      </div>

      {/* כפתור החלפה */}
      <div className="mt-8 text-center">
        {/* <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-purple-700 hover:text-purple-900 text-lg font-semibold transition"
        >
          {isLogin ? "אין לך משתמש? לחץ כאן להרשמה" : "כבר רשום? לחץ כאן להתחברות"}
        </button>
        
          <button
          onClick={() => deletMyUser()}
          className="text-purple-700 hover:text-purple-900 text-lg font-semibold transition"
        >
          {"לחץ למחיקה"}
        </button> */}
        <div className="flex flex-col space-y-4">
  <button
    onClick={() => setIsLogin(!isLogin)}
    className="text-purple-700 hover:text-purple-900 text-lg font-semibold transition"
  >
    {isLogin ? "אין לך משתמש? לחץ כאן להרשמה" : "כבר רשום? לחץ כאן להתחברות"}
  </button>

  <button
   onClick={() => deletMyUser()}
    className="text-purple-700 hover:text-purple-900 text-lg font-semibold transition"
  >לחץ למחיקת המשתמש שלך  
  </button>
  <button
    onClick={() => navigate("/")}
    className="text-purple-700 hover:text-purple-900 text-lg font-semibold transition"
  >
    חזרה לדף הבית
  </button>
   <button
        onClick={goToUsers}
    className="text-purple-700 hover:text-purple-900 text-lg font-semibold transition"
  >
למנהלי האתר- צפייה ברשימת המשתמשים   </button>
</div>
 


      </div>
      
    </motion.div>
  );
}
