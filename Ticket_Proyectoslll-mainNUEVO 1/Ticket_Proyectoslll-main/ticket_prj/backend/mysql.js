const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
 
const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Univalle',
  database: 'ticket_db',
});
 
app.use(express.json());
 
// Create a new event
app.post('/evento', async (req, res) => {
  try {
    const { adminId, title, description, locationId, eventDate, eventTime, audienceType } = req.body;
    const [result] = await db.query(
      'INSERT INTO evento (admin_id, title, description, location_id, event_date, event_time, audience_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [adminId, title, description, locationId, eventDate, eventTime, audienceType]
    );
    res.json({ id: result.insertId });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
app.get('/evento', async (req, res) => {
  try {
    const { audience_type } = req.query;
    let sqlQuery = 'SELECT e.*, l.location_name FROM evento e JOIN locations l ON e.location_id = l.location_id';
 
    // Add filtering based on audience_type
    if (audience_type !== undefined) {
      sqlQuery += ' WHERE e.audience_type = ?';
    }
 
    const [results] = await db.query(sqlQuery, [audience_type]);
 
    console.log(results);
 
    res.json(results);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
// Modify the /evento endpoint to accept multiple audience_types as a query parameter
app.get('/eventos', async (req, res) => {
  try {
    const { audience_type } = req.query;
    let sqlQuery = 'SELECT e.*, l.location_name FROM evento e JOIN locations l ON e.location_id = l.location_id';
 
    // Check if audience_type is provided and is a valid array
    if (Array.isArray(audience_type) && audience_type.length > 0) {
      sqlQuery += ' WHERE e.audience_type IN (?)';
    }
 
    const [results] = await db.query(sqlQuery, [audience_type]);
 
    res.json(results);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
 
 
 
//admin
 
// Admin login endpoint
app.post('/admin/login', async (req, res) => {
  const { university_code, university_password } = req.body;
 
  try {
    const [results] = await db.query(
      'SELECT * FROM admin WHERE university_code = ? AND university_password = ?',
      [university_code, university_password]
    );
 
    if (results.length === 1) {
      // Successful login
      res.status(200).json({ message: 'Admin login successful' });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid admin credentials' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
/*app.get('/admin', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM admin');
    res.json(results);
  } catch (error) {
    console.error('Error fetching admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/
 
 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 
//ubicaciones
app.get('/locations', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM locations');
    res.json(results);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
app.post('/locations', async (req, res) => {
  try {
    const { location_name } = req.body;
    const [result] = await db.query('INSERT INTO locations (location_name) VALUES (?)', [location_name]);
    res.json({ id: result.insertId });
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
//Usuarios
app.post('/users/login', async (req, res) => {
  const { university_code, university_password } = req.body;
 
  try {
    const [results] = await db.query(
      'SELECT * FROM users WHERE university_code = ? AND university_password = ?',
      [university_code, university_password]
    );
 
    if (results.length === 1) {
      // Successful login
      res.status(200).json({ message: 'User login successful' });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid user credentials' });
    }
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
//log in all users
 
// Unified login endpoint for both admin and user
app.post('/login', async (req, res) => {
  const { university_code, university_password } = req.body;
 
  try {
    // Check if it's an admin
    const [adminResults] = await db.query(
      'SELECT * FROM admin WHERE university_code = ? AND university_password = ?',
      [university_code, university_password]
    );
 
    if (adminResults.length === 1) {
      // Successful admin login
      res.status(200).json({ message: 'Admin login successful', isAdmin: true, user_type: null });
      return;
    }
 
    // Check if it's a user
    const [userResults] = await db.query(
      'SELECT * FROM users WHERE university_code = ? AND university_password = ?',
      [university_code, university_password]
    );
 
    if (userResults.length === 1) {
      // Successful user login
      const { user_type } = userResults[0];
      const {user_id} = userResults[0];
      res.status(200).json({ message: 'User login successful', isAdmin: false, user_type, user_id});
      return;
    }
 
    // Invalid credentials
    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
//users Nuevo
app.get('/users', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM users');
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
 
//usuarios presentes:
app.post('/attendees', async (req, res) => {
  try {
    const { event_id, user_id } = req.body;
 
    // Check if the combination of event_id and user_id already exists in the Attendees table
    const [existingAttendees] = await db.query(
      'SELECT * FROM attendance WHERE event_id = ? AND user_id = ?',
      [event_id, user_id]
    );
 
    if (existingAttendees.length === 0) {
      // If not, insert a new record into the Attendees table
      const [result] = await db.query(
        'INSERT INTO attendance (event_id, user_id) VALUES (?, ?)',
        [event_id, user_id]
      );
 
      res.status(200).json({ id: result.insertId });
    } else {
      // If the combination already exists, send a conflict response (409)
      res.status(409).json({ error: 'User already registered for the event' });
    }
  } catch (error) {
    console.error('Error adding attendee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
app.get('/attendees/check', async (req, res) => {
  try {
    const { user_id, event_id } = req.query;
 
    if (!user_id || !event_id) {
      return res.status(400).json({ error: 'Missing user_id or event_id parameters' });
    }
 
    const [results] = await db.query(
      'SELECT * FROM attendance WHERE user_id = ? AND event_id = ?',
      [user_id, event_id]
    );
 
    res.json(results);
  } catch (error) {
    console.error('Error checking user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
// Get attendance list
app.get('/attendance', async (req, res) => {
  try {
    const query = `
      SELECT
        a.attendance_id,
        e.title AS event_name,
        CONCAT(u.first_name, ' ', COALESCE(u.second_name, ''), ' ', u.last_name, ' ', COALESCE(u.second_last_name, '')) AS user_full_name
      FROM
        attendance a
      JOIN evento e ON a.event_id = e.event_id
      JOIN users u ON a.user_id = u.user_id;
    `;
 
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
//by id
app.get('/attendance/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
 
    const [results] = await db.query(
      `
      SELECT
        e.event_id,
        e.title AS event_title,
        CONCAT(u.first_name, ' ', COALESCE(u.second_name, ''), ' ', u.last_name, ' ', COALESCE(u.second_last_name, '')) AS user_full_name
      FROM
        evento e
      JOIN
        attendance a ON e.event_id = a.event_id
      JOIN
        users u ON a.user_id = u.user_id
      WHERE
        e.event_id = ?
      `,
      [eventId]
    );
 
    res.json(results);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
 
