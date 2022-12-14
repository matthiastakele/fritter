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
 * @name POST /api/likes
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
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    await LikeCollection.addOne(userId, req.body.freetId);
    res.status(200).json({
      message: 'You liked the freet successfully.',
    });
  }
);

/**
 * Unlike a freet.
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
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    await LikeCollection.deleteOne(userId, req.params.freetId);
    res.status(200).json({
      message: 'You unliked the freet successfully.',
    });
  }
);

/**
 * Get likes for a freet.
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
  '/freets/:freetId?',
  [
    freetValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const likes = await LikeCollection.findAllByFreetId(req.params.freetId);
    // const count = likes.length;
    res.status(200).json({
      likes
    });
    
  }
);

/**
 * Get all likes for a user
 *
 * @name GET /api/likes/users/:userId
 *
 * @return {string} - The number of likes
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the freetId is not valid
 *
 */
 router.get(
  '/users/:userId?',
  [
  ],
  async (req: Request, res: Response) => {
    const likes = await LikeCollection.findAllByUserId(req.params.userId);
    //const count = likes.length;
    res.status(200).json({
      likes
    });
    
  }
);

export {router as likeRouter};
