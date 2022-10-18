import mongoose from 'mongoose';
import type {HydratedDocument, Types} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../freet/model';
import type {Like} from './model';
import LikeModel from './model';
import UserCollection from '../user/collection';
import UserModel from '../user/model';
import FreetModel from '../freet/model';

/**
 * This files contains a class that has the functionality to explore likes
 * stored in MongoDB, including adding, finding, updating, and deleting likes.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Circle> is the output of the CircleModel() constructor,
 * and contains all the information in Circle. https://mongoosejs.com/docs/typescript.html
 */
class LikeCollection {
  /**
   * Add a like to a freet
   *
   * @param {string} freetId - The id of a freet
   * @return {Promise<HydratedDocument<Like>>} - The newly created Like
   */
  static async addLike(userId: Types.ObjectId | string, freetId: Types.ObjectId | string): Promise<HydratedDocument<Like>> {
    const like = new LikeModel({
      userId,
      freetId
    });
    const already_liked = await LikeCollection.checkIfUserLikedFreet(userId, freetId);
    if(!already_liked){
      await like.save(); // Saves like to MongoDB
    }
    return like.populate('userId');
  }

  /**
   * Delete a like from a freet
   *
   * @param {string} freetId - The id of a freet
   * @return {Promise<Boolean>} - true if the Like has been deleted, false otherwise
   */
   static async deleteLike(userId: Types.ObjectId | string, freetId: Types.ObjectId | string): Promise<Boolean> {
    const like = new LikeModel({
      userId,
      freetId
    });
    const freet = await LikeModel.findOneAndDelete({userId, freetId});
    return freet !== null;
  }

/**
   * Get Likes by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Like>>} - The Likes with the given userId, if any
   */
 static async getLikesByUserId(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Like>>> {
  return LikeModel.find({userId: userId});
}

/**
   * Get Likes by freetId
   *
   * @param {string} freetId - The id of the freet to find
   * @return {Promise<HydratedDocument<Like>>} - The Likes with the given freetId, if any
   */
 static async getLikesByFreetId(freetId: Types.ObjectId | string): Promise<Array<HydratedDocument<Like>>> {
  return LikeModel.find({freetId: freetId});
}

/**
   * Check if user liked a freet
   *
   * @param {string} userId - The id of the user to find
   * @param {string} freetId - The id of the freet to find
   * @return {Promise<HydratedDocument<Like>>} - The Like with the given freetId, if any
   */
 static async checkIfUserLikedFreet(userId: Types.ObjectId | string, freetId: Types.ObjectId | string): Promise<Boolean> {
  const check = await LikeModel.find({userId: userId, freetId: freetId});
  return check.length != 0;
}
}

export default LikeCollection;

