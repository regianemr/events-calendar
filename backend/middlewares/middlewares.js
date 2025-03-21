import jwt from 'jsonwebtoken'
import { jwtDecode } from "jwt-decode"

// function check token
function checkToken(req, res, next) {

  const authHeader = req.headers['authorization']
  const token = authHeader?.split(" ")[1]

  if(!token) {
    return res.status(401).json({ message: "Acesso negado!" })
  }

  try {
    const secret = process.env.SECRET

    jwt.verify(token, secret)
    const decoded = jwtDecode(token);
    req.userId = decoded.id

    next()

  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Token inválido!" })
  }
}

export default checkToken