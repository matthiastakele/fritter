import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import LikeCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
// import * as util from './util';

const router = express.Router();

/**
 * Like a freet.
 *
 * @name POST /api/freets/:id/like
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
router.post(
  '/:freetId?/like',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    await LikeCollection.addLike(userId, req.params.freetId);
    res.status(200).json({
      message: 'You liked the freet successfully.',
    });
    res.status(400).json({
      message: "pizza",
    });
  }
);

/**
 * Unlike a freet.
 *
 * @name DELETE /api/freets/:id/like
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
 router.delete(
  '/:freetId?/like',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    await LikeCollection.deleteLike(userId, req.params.freetId);
    res.status(200).json({
      message: 'You unliked the freet successfully.',
    });
  }
);

/**
 * Get likes for a freet.
 *
 * @name GET /api/freets/:freetId/numOflikes
 *
 * @return {string} - The number of likes
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the freetId is not valid
 *
 */
 router.get(
  '/:freetId?/numOfLikes',
  [
    freetValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const likes = await LikeCollection.getLikesByFreetId(req.params.freetId);
    // const count = likes.length;
    res.status(200).json({
      likes
    });
    
  }
);

/**
 * Get number of likes for a user
 *
 * @name GET /api/freets/users/:userId/numOfLikes
 *
 * @return {string} - The number of likes
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the freetId is not valid
 *
 */
 router.get(
  '/users/:userId?/numOfLikes',
  [
  ],
  async (req: Request, res: Response) => {
    const likes = await LikeCollection.getLikesByUserId(req.params.userId);
    //const count = likes.length;
    res.status(200).json({
      likes
    });
    
  }
);

export {router as likeRouter};
