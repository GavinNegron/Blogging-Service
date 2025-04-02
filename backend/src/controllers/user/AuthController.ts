import { Request, Response } from 'express';
import { fromNodeHeaders } from "better-auth/node";
import { auth } from '../../config/auth';

class AuthController {
  getUserSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: "Failed to get session." });
    }
  };

  registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body || {};

    if (!email || !password || !name) {
      res.status(400).json({ error: "Missing required fields." });
      return;
    }

    try {
      await auth.api.signUpEmail({
        body: { email, password, name }
      });
      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to register user. " + (error instanceof Error ? error.message : "Unknown error.") });
    }
  }

  loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body || {};

    if (!email || !password) {
      res.status(400).json({ error: "Missing required fields." });
      return;
    }

    try {
      const session = await auth.api.signInEmail({
        body: { email, password }
      });

      if (!session) {
        res.status(401).json({ error: "Invalid credentials." });
        return;
      }

      res.json(session);
    } catch (error) {
      res.status(500).json({ error: (error instanceof Error ? error.message : "Unknown error.") });
    }
  }
}

export default new AuthController();