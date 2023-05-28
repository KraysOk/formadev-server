// routes.js
const express = require('express');
const db = require('./db');

const router = express.Router();

// Ruta GET para obtener todos los usuarios
router.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    } else {
      res.json(results);
    }
  });
});

// Ruta POST para crear un nuevo usuario
router.post('/usuarios', (req, res) => {
  const { nombre, email, contraseña } = req.body;
  const newUser = { nombre, email, contraseña };

  db.query('INSERT INTO usuarios SET ?', newUser, (error, results) => {
    if (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error al crear usuario' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para obtener todos los proyectos
router.get('/projects', (req, res) => {
  const query = 'SELECT * FROM PROJECT';
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los proyectos:', error);
      res.status(500).json({ error: 'Error al obtener los proyectos' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para crear un nuevo proyecto
router.post('/projects', (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO PROJECT (PROJ_NAME, PROJ_DESCRIPTION) VALUES (?, ?)';
  const values = [name, description];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al crear el proyecto:', error);
      res.status(500).json({ error: 'Error al crear el proyecto' });
    } else {
      res.json({ message: 'Proyecto creado exitosamente', projectId: result.insertId });
    }
  });
});

// Ruta para obtener todos los type_report
router.get('/type_reports', (req, res) => {
  const query = 'SELECT * FROM type_report';
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los type_report:', error);
      res.status(500).json({ error: 'Error al obtener los type_report' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para crear un nuevo type_report
router.post('/type_reports', (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO type_report (TYRE_NAME, TYRE_DESCRIPTION) VALUES (?, ?)';
  const values = [name, description];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al crear el type_report:', error);
      res.status(500).json({ error: 'Error al crear el type_report' });
    } else {
      res.json({ message: 'Type_report creado exitosamente', typeId: result.insertId });
    }
  });
});

// Ruta para obtener todos los reportes con la descripción del tipo de reporte y el nombre del proyecto
router.get('/reports', (req, res) => {
  const query = 'SELECT r.*, tr.TYRE_NAME AS TYRE_NAME, p.PROJ_NAME AS PROJ_NAME FROM report r LEFT JOIN type_report tr ON r.TYRE_ID = tr.TYRE_ID LEFT JOIN project p ON r.PROJ_ID = p.PROJ_ID';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los reportes:', error);
      res.status(500).json({ error: 'Error al obtener los reportes' });
    } else {
      res.json(results);
    }
  });
});


// Ruta para obtener un reporte por ID
router.get('/reports/:reportId', (req, res) => {
  const { reportId } = req.params;
  const query = `SELECT r.*, tr.TYRE_NAME AS TYRE_NAME, p.PROJ_NAME AS PROJ_NAME FROM report r LEFT JOIN type_report tr ON r.TYRE_ID = tr.TYRE_ID LEFT JOIN project p ON r.PROJ_ID = p.PROJ_ID  WHERE REPO_ID = ${reportId}`;
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener el reporte:', error);
      res.status(500).json({ error: 'Error al obtener el reporte' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Reporte no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
});

// Ruta para crear un nuevo reporte
router.post('/reports', (req, res) => {
  const { title, description, typeReport, project} = req.body;
  const query = 'INSERT INTO REPORT (REPO_TITLE, REPO_DESCRIPTION, TYRE_ID, PROJ_ID) VALUES (?, ?, ?, ?)';
  const values = [title, description, typeReport, project];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al crear el reporte:', error);
      res.status(500).json({ error: 'Error al crear el reporte' });
    } else {
      res.json({ message: 'Reporte creado exitosamente', reportId: result.insertId });
    }
  });
});

// Ruta para obtener todos los incidentes
router.get('/incidents', (req, res) => {
  const query = 'SELECT * FROM INCIDENT';
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los incidentes:', error);
      res.status(500).json({ error: 'Error al obtener los incidentes' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para crear un nuevo incidente
router.post('/incidents', (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO INCIDENT (INCI_NAME, INCI_DESCRIPTION) VALUES (?, ?)';
  const values = [name, description];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al crear el incidente:', error);
      res.status(500).json({ error: 'Error al crear el incidente' });
    } else {
      res.json({ message: 'Incidente creado exitosamente', incidentId: result.insertId });
    }
  });
});

// Ruta para obtener todas las tareas
router.get('/tasks', (req, res) => {
  const query = 'SELECT * FROM TASK';
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener las tareas:', error);
      res.status(500).json({ error: 'Error al obtener las tareas' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para crear una nueva tarea
router.post('/tasks', (req, res) => {
  const {taskName, activityCode } = req.body;
  const query = 'INSERT INTO TASK (TASK_NAME, ACTI_ID) VALUES (?, ?)';
  const values = [taskName, activityCode];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al crear la tarea:', error);
      res.status(500).json({ error: 'Error al crear la tarea' });
    } else {
      res.json({ message: 'Tarea creada exitosamente', taskId: result.insertId });
    }
  });
});

// Ruta para obtener todas las actividades
router.get('/activities', (req, res) => {
  const query = 'SELECT * FROM ACTIVITY';
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener las actividades:', error);
      res.status(500).json({ error: 'Error al obtener las actividades' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para crear una nueva actividad
router.post('/activities', (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO ACTIVITY (ACTI_NAME, ACTI_DESCRIPTION) VALUES (?, ?)';
  const values = [name, description];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al crear la actividad:', error);
      res.status(500).json({ error: 'Error al crear la actividad' });
    } else {
      res.json({ message: 'Actividad creada exitosamente', activityId: result.insertId });
    }
  });
});

// Ruta para crear una nueva actividad y asignarla a un reporte
router.post('/reports/:reportId/activities', (req, res) => {
  const { reportId } = req.params;
  const { name } = req.body;
  const query = 'INSERT INTO ACTIVITY (ACTI_NAME, REPO_ID) VALUES (?, ?)';
  const values = [name, reportId];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al crear y asignar la actividad:', error);
      res.status(500).json({ error: 'Error al crear y asignar la actividad' });
    } else {
      res.json({ message: 'Actividad creada y asignada exitosamente', activityId: result.insertId });
    }
  });
});

module.exports = router;
