const knex = require('../database/connection')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const params = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
module.exports = () => {
  passport.use(new JwtStrategy(params, async (payload, done) => {
    try {
      const response = await knex('users')
        .where({ id: payload.id })
        .first()

      done(null, response ? payload : false)
    } catch (error) {
      console.log(error)
      return error
    }
  }))
  return {
    authenticate: () => { return passport.authenticate('jwt', { session: false }) }
  }
}