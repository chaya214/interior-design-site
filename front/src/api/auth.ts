type UserData = {
  userName: string;
  email: string;
  password: string;
};

type LoginCredentials = {
  userName: string;
  password: string;
};

type AuthResponse = {
  success: boolean;
  message: string;
};

// const API_URL = "http://localhost:5000"; // כתובת השרת שלך
// const API_URL = import.meta.env.VITE_API_URL!;
 const API_URL = "http://192.168.33.10:5000"; // או קרא את זה מ־.env


// שמירה של משתמש חדש בשרת (הרשמה)
export const saveUser = async (userData: UserData): Promise<AuthResponse> => {
  try {
const res = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    return { success: res.ok, message: data.message || "נרשמת בהצלחה!" };
  } catch (err) {
    return { success: false, message: "שגיאה בחיבור לשרת" };
  }
};

// התחברות מול השרת
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
const res = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    return { success: res.ok, message: data.message || "התחברת בהצלחה!" };
  } catch (err) {
    return { success: false, message: "שגיאה בחיבור לשרת" };
  }
};

// export const deletuser = async (password: string): Promise<AuthResponse> => {
//   try {
// // const res = await fetch(`${API_URL}/api/users/delete/${password}`, {
//     const res = await fetch(`${API_URL}/api/users/${password}`, {

//       method: "delete",
//       // headers: { "Content-Type": "application/json" },
//       // body: JSON.stringify(credentials),
//     });

//     const data = await res.json();
//     return { success: res.ok, message: data.message || "נמחק "};
//   } catch (err) {
    
//     return { success: false, message: "שגיאה בחיבור לשרת" };
//   }
// };
type DeleteCredentials = {
  userName: string;
  password: string;
};

// export const deletuser = async (credentials: DeleteCredentials): Promise<AuthResponse> => {
//   try {
//     const res = await fetch(`${API_URL}/api/users`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(credentials),
//     });

//     const data = await res.json();
//     return { success: res.ok, message: data.message || "המשתמש נמחק בהצלחה" };
//   } catch (err) {
//     return { success: false, message: "שגיאה בחיבור לשרת" };
//   }
// };
// export const deletuser = async (userName: string, password: string) => {
//   try {
//     const response = await fetch("http://192.168.33.10:5000/api/users/delete", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username: userName, password }), // 🔧 שים לב כאן
//     });
//     return await response.json();
//   } catch (err) {
//     console.error("שגיאה במחיקת משתמש:", err);
//     return { success: false, message: "שגיאה בלקוח" };
//   }
// };
export const deletuser = async (userName: string, password: string) => {
  try {
    const response = await fetch(
      `http://192.168.33.10:5000/api/users/delete?username=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch (err) {
    console.error("שגיאה במחיקת משתמש:", err);
    return { success: false, message: "שגיאה בלקוח" };
  }
};



// type UserData = {
//   userName: string;
//   email: string;
//   password: string;
// };

// type LoginCredentials = {
//   userName: string;
//   password: string;
// };

// type AuthResponse = {
//   success: boolean;
//   message: string;
// };

// // const API_URL = "http://localhost:5000"; // כתובת השרת שלך
// const API_URL = "http://192.168.33.10:5000"; // או קרא את זה מ־.env

// // שמירה של משתמש חדש בשרת (הרשמה)
// export const saveUser = async (userData: UserData): Promise<AuthResponse> => {
//   try {
//     const res = await fetch(`${API_URL}/api/users`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//       credentials: "include", // ✅ חשוב מאוד
//     });

//     const data = await res.json();
//     return { success: res.ok, message: data.message || "נרשמת בהצלחה!" };
//   } catch (err) {
//     return { success: false, message: "שגיאה בחיבור לשרת" };
//   }
// };

// // התחברות מול השרת
// export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
//   try {
//     const res = await fetch(`${API_URL}/api/users/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(credentials),
//       credentials: "include", // ✅ גם כאן חובה
//     });

//     const data = await res.json();
//     return { success: res.ok, message: data.message || "התחברת בהצלחה!" };
//   } catch (err) {
//     return { success: false, message: "שגיאה בחיבור לשרת" };
//   }
// };
