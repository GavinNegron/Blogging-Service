import { Request, Response } from 'express';
import { db } from '../../config/db';
import { user, blog } from '../../config/schema';
import { eq } from 'drizzle-orm';

class AccountController {
  completeOnboarding = async (req: Request, res: Response): Promise<void> => {
    try {
      const { blogName } = req.body || {};
      const { id: userId } = req.params;
      console.log(req.body);

      if (!blogName) {
        res.status(400).json({ success: false, message: "All fields are required" });
        return;
      }
      
      const userExists = await db.select().from(user).where(eq(user.id, userId)).execute();

      if (!userExists || userExists.length === 0) {
        res.status(404).json({ error: "User not found." });
        return;
       }

       const userUpdate = await db.update(user)
        .set({
            onboardingComplete: true
        })
        .where(eq(user.id, userId));

       const blogUpdate = await db.update(blog)
        .set({
          blogName
        })
        .where(eq(blog.userId, userId));
       
       res.status(200).json({ success: true, data: { userUpdate, blogUpdate } })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to get user blog details." });
    }
  };
}

export default new AccountController();