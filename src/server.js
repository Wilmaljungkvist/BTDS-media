import httpContext from 'express-http-context'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'
import logger from 'morgan'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { router } from './routes/router.js'
import { connectToDatabase } from './config/mongoose.js'
import { morganLogger } from './config/morgan.js'
try {
  await connectToDatabase(process.env.DB_CONNECTION_STRING)

  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  const app = express()

  const baseURL = process.env.BASE_URL || '/'

  app.use(logger('dev'))
  app.use(morganLogger)

  app.use(cors())
  const cspOptions = {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
      frameSrc: ["'self'", 'https://www.youtube.com', 'https://www.facebook.com', 'https://instagram.com']
    }
  }

  app.use(helmet.contentSecurityPolicy(cspOptions))

  app.use(httpContext.middleware)

  app.set('view engine', 'ejs')
  app.set('views', join(directoryFullName, 'views'))
  app.use(expressLayouts)
  app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use('/', express.static(join(directoryFullName, '..', 'public')))

  const sessionOptions = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12,
      sameSite: 'lax'
    }
  }

  app.use(session(sessionOptions))

  app.use((req, res, next) => {
    if (req.session.flash) {
      res.locals.flash = req.session.flash
      delete req.session.flash
    }

    res.locals.baseURL = baseURL

    next()
  })

  app.use('/', router)

  app.use((err, req, res, next) => {
    if (err.status === 404) {
      return res
        .status(404)
        .sendFile(join(directoryFullName, 'views', 'errors', '404.html'))
    }

    if (req.app.get('env') !== 'development') {
      return res
        .status(500)
        .sendFile(join(directoryFullName, 'views', 'errors', '500.html'))
    }

    res
      .status(err.status || 500)
      .render('errors/error', { error: err })
  })

  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
