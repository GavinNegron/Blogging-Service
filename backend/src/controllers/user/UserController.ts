import { Request, Response } from 'express';
import { auth } from '../../config/auth';
import { fromNodeHeaders } from 'better-auth/node';

class UserController {
  getUserProfile = async (req: Request, res: Response) => {
    try {
       const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
       });

       res.json(session)
    } catch (error) {
        res.status(500).json({ error: "Failed to get user profile." });
    }
  };
}

export default new UserController();