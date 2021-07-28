import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

//npm install jsonwebtoken
import * as jwt from "jsonwebtoken"

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
    console.log(`logout`, req.body)
    res.clearCookie("token")
    res.json(`logout`)
}

