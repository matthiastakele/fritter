import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import CircleCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
// import * as util from './util';

const router = express.Router();

/**
 * Get circles by author.
 *
 * @name GET /api/circles?authorId=id
 *
 * @return {CircleResponse} - A dictionary of users and freets associated with circle
 * @throws {400} - If authorId is not given
 * @throws {404} - If no user has given authorId
 *
 */
router.get(
  '/',
  [
    userValidator.isAuthorExists
  ],
  async (req: Request, res: Response) => {
    const circles = await CircleCollection.findAllByUsername(req.query.author as string);
    res.status(200).json(circles);
  }
);

/**
 * Create a new circle.
 *
 * @name POST /api/circles
 *
 * @param {string} name - The name of the circle
 * @return {CircleResponse} - The created circle
 * @throws {403} - If the user is not logged in
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const circle = await CircleCollection.addOne(userId, req.body.name);

    res.status(201).json({
      message: 'Your circle was created successfully.',
      circle: circle
    });
  }
);

/**
 * Delete a circle
 *
 * @name DELETE /api/circles/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
router.delete(
  '/:circleId?',
  [
    userValidator.isUserLoggedIn,
    //freetValidator.isFreetExists,
    //freetValidator.isValidFreetModifier
  ],
  async (req: Request, res: Response) => {
    await CircleCollection.deleteOne(req.params.circleId);
    res.status(200).json({
      message: 'Your freet was deleted successfully.'
    });
  }
);


export {router as freetRouter};
