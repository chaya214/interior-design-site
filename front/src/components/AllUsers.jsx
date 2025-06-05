
import React, { useEffect, useState } from 'react';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://192.168.33.10:5000/api/users/all')
      .then((res) => {
        if (!res.ok) throw new Error('שגיאה בשרת');
        return res.json();
      })
      .then((data) => {
        console.log('response from server:', data);
        if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          throw new Error('הנתונים שהתקבלו אינם מערך');
        }
      })
      .catch((err) => {
        console.error('שגיאה:', err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>שגיאה: {error}</div>;
  }

  return (
    <div style={{ direction: 'rtl', padding: '1rem' }}>
      <h2>רשימת המשתמשים</h2>
      {users.length === 0 ? (
        <p>אין משתמשים להצגה.</p>
      ) : (
        users.map((user) => (
          <div key={user._id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
            <p><strong>שם משתמש:</strong> {user.username}</p>
            <p><strong>אימייל:</strong> {user.email}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AllUsers;
