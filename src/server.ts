import { json } from 'body-parser'
import express from 'express'

import { createAttendance, listAttendances, getAnalytics } from './routes/attendanceRoutes'

const app = express()
app.use(json())

app.post('/attendances', createAttendance)
app.get('/attendances', listAttendances)
app.get('/analytics', getAnalytics)

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})
