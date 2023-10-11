import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: "http://localhost:8000",
    issuerBaseURL: "https://dev-7t3kl4hb6o875wkm.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck