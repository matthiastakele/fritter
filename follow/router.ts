import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FollowCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
// import * as util from './util';

const router = express.Router();

/**
 * Follow a user
 *
 * @name POST /api/follows
 *
 * @param {string} freetId - The id of a freet
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    await FollowCollection.addOne(userId, req.body.userId);
    res.status(200).json({
      message: 'You followed the user successfully.',
    });
  }
);

/**
 * Unfollow a user
 *
 * @name DELETE /api/likes
 *
 * @param {string} freetId - The id of a freet
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
 router.delete(
  '/:userId?',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    await FollowCollection.deleteOne(userId, req.params.userId);
    res.status(200).json({
      message: 'You unfollowed the user successfully.',
    });
  }
);

/**
 * Get followers
 *
 * @name GET /api/likes/freets/:freetId
 *
 * @param {string} freetId - The id of a freet
 * @return {string} - The number of likes
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the freetId is not valid
 *
 */
 router.get(
  '/:userId?/followers',
  [
    
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const followers = await FollowCollection.findAllFollowers(userId);
    // const count = likes.length;
    res.status(200).json({
      followers
    });
    
  }
);

/**
 * Get following
 *
 * @name GET /api/likes/users/:userId
 *
 * @return {string} - The number of likes
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the freetId is not valid
 *
 */
 router.get(
  '/:userId?/following',
  [
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const following = await FollowCollection.findAllFollowers(userId);
    //const count = likes.length;
    res.status(200).json({
      following
    });
    
  }
);

export {router as followRouter};
