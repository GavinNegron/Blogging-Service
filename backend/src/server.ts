require('dotenv').config()

import express, { Application, Router } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import fs from 'fs'
import path from 'path'
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth";

const app: Application = express()
const port = process.env.PORT || 5000

app.use(cookieParser())
app.use(morgan('combined'))
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: 'Too many requests from this IP, please try again later',
}));

app.use(helmet())
app.use(helmet.xssFilter())
app.use(helmet.frameguard({ action: 'deny' }))
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true,
}));

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

function loadRoutes(app: Application): void {
  const routesDir = path.resolve(__dirname, './routes')
  fs.readdirSync(routesDir).forEach(file => {
    const filePath = path.join(routesDir, file)
    if (fs.statSync(filePath).isFile() && filePath.endsWith('.ts')) {
      import(filePath).then(routeModule => {
        const route: Router = routeModule.default || routeModule
        app.use(route)  
      }).catch(err => {
        console.error(`Error loading route ${filePath}:`, err)
      })
    }
  })
}

loadRoutes(app);

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

const server = app.listen(port, () => {
  console.log(`Server up and running on port ${port}`)
})

process.on('unhandledRejection', (err: Error) => {
  console.error(`Unhandled Rejection: ${err.message}`)
  server.close(() => process.exit(1))
})

export default app;