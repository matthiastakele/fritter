import mongoose from 'mongoose';
import type {HydratedDocument, Types} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../freet/model';
import type {Circle} from './model';
import CircleModel from './model';
import UserCollection from '../user/collection';
import UserModel from '../user/model';

/**
 * This files contains a class that has the functionality to explore circles
 * stored in MongoDB, including adding, finding, updating, and deleting circles.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Circle> is the output of the CircleModel() constructor,
 * and contains all the information in Circle. https://mongoosejs.com/docs/typescript.html
 */
class CircleCollection {
  /**
   * Add an empty circle to the collection
   *
   * @param {string} userId - The id of the author of the circle
   * @param {string} name - The id of the name of the circle
   * @return {Promise<HydratedDocument<Circle>>} - The newly created circle
   */
  static async addOne(userId: Types.ObjectId | string, name: string): Promise<HydratedDocument<Circle>> {
    const circle = new CircleModel({
      userId,
      name: name,
      users: new Set<User>(),
      freets: new Set<Freet>()
    });
    await circle.save(); // Saves freet to MongoDB
    return circle.populate('userId');
  }

  /**
   * Delete a circle with given circleId.
   *
   * @param {string} circleId - The circleId of freet to delete
   * @return {Promise<Boolean>} - true if the circle has been deleted, false otherwise
   */
   static async deleteOne(circleId: Types.ObjectId | string): Promise<boolean> {
    const freet = await CircleModel.deleteOne({_id: circleId});
    return freet !== null;
  }

  /**
   * Find a circle by circleId
   *
   * @param {string} CircleId - The id of the circle to find
   * @return {Promise<HydratedDocument<Freet>> | Promise<null> } - The circle with the given circleId, if any
   */
  static async findOne(circleId: Types.ObjectId | string): Promise<HydratedDocument<Freet>> {
    return CircleModel.findOne({_id: circleId}).populate('userId');
  }

  /**
   * Get all the circles in the database
   *
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the circles
   */
  static async findAll(): Promise<Array<HydratedDocument<Freet>>> {
    // Retrieves circles
    return CircleModel.find({}).populate('userId');
  }

  /**
   * Get all the circles by given author
   *
   * @param {string} username - The username of author of the freets
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
  static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Freet>>> {
    const author = await UserCollection.findOneByUsername(username);
    return CircleModel.find({userId: author._id}).populate('userId');
  }

  /**
   * Delete all the circles by the given author
   *
   * @param {string} userId - The id of author of circle
   */
   static async deleteMany(userId: Types.ObjectId | string): Promise<void> {
    await CircleModel.deleteMany({userId});
  }

  /**
   * Add a new viewer to a circle
   *
   * @param {string} circleId - The id of the circle to be updated
   * @param {string} viewerId - The new content of the freet
   * @return {Promise<HydratedDocument<Circle>>} - The newly updated circle
   */
  static async addViewer(circleId: Types.ObjectId | string, viewerId: string): Promise<HydratedDocument<Freet>> {
    const circle = await CircleModel.findOne({_id: circleId});
    circle.users.add(new mongoose.Types.ObjectId(viewerId));
    await circle.save();
    return circle.populate('userId');
  }

  /**
   * Delete a viewer from a circle
   *
   * @param {string} circleId - The id of the circle to be updated
   * @param {string} viewerId - The new content of the freet
   * @return {Promise<HydratedDocument<Circle>>} - The newly updated circle
   */
   static async deleteViewer(circleId: Types.ObjectId | string, viewerId: string): Promise<HydratedDocument<Freet>> {
    const circle = await CircleModel.findOne({_id: circleId});
    circle.users.delete(new mongoose.Types.ObjectId(viewerId));
    await circle.save();
    return circle.populate('userId');
  }

  /**
   * Add a new freet to a circle
   *
   * @param {string} circleId - The id of the circle to be updated
   * @param {string} freetId - The id of the freet
   * @return {Promise<HydratedDocument<Circle>>} - The newly updated circle
   */
   static async addFreet(circleId: Types.ObjectId | string, freetId: string): Promise<HydratedDocument<Freet>> {
    const circle = await CircleModel.findOne({_id: circleId});
    circle.freets.add(new mongoose.Types.ObjectId(freetId));
    await circle.save();
    return circle.populate('userId');
  }

  /**
   * Delete a freet from a circle
   *
   * @param {string} circleId - The id of the circle to be updated
   * @param {string} viewerId - The id of the freet
   * @return {Promise<HydratedDocument<Circle>>} - The newly updated circle
   */
   static async deleteFreet(circleId: Types.ObjectId | string, freetId: string): Promise<HydratedDocument<Freet>> {
    const circle = await CircleModel.findOne({_id: circleId});
    circle.freets.delete(new mongoose.Types.ObjectId(freetId));
    await circle.save();
    return circle.populate('userId');
  }

}

export default CircleCollection;
