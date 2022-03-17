import { User } from '../models/user.models';
import { validateUser, validateUpdate } from '../models/user.models';
import { pick } from 'lodash';
import { HttpException } from '../common';

class UserService {
    private static instance: UserService;

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    /**
     * Check the phone number and email has been created or not, if it has already been created, it will not allow to create
     * Check password is not allowed to contain special characters
     * Returns true if valid, otherwise throws an httpexception
     *
     * @param {*} userData
     */

    static async chekingDataBeforeCreate(userData: any) {
        const { error } = validateUser(userData);
        if (error) throw new HttpException(400, { error_code: '01', error_message: error.details[0].message });

        const existsUser = await User.findOne({ email: userData.email, phoneNumber: userData.phoneNumber });
        if (existsUser)
            throw new HttpException(400, { error_code: '01', error_message: 'Email hoặc số điện thoại đã tồn tại' });

        // password must not contain special characters
        const format = /[^a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/;
        if (format.test(userData.password))
            throw new HttpException(404, {
                error_code: '01',
                error_message: 'Password must not contain special characters'
            });

        return true;
    }

    /**
     *Function create user data
     *
     * @param {*} userData
     */
    static async createUser(userData: any) {
        await UserService.chekingDataBeforeCreate(userData);

        const user = new User(
            pick(userData, [
                'name',
                'email',
                'password',
                'address',
                'phoneNumber',
                'birthdate',
                'gender',
                'roles',
                'user_created',
                'user_updated',
                'admin'
            ])
        );
        user.hashPassword();
        await user.save();

        return user;
    }

    /**
     * Function to get user data by token
     *
     * @param {*} user
     * @return
     */
    static async getMe(user:any) {
        const me = await User.findById(user._id).select('-password');
        console.log(me);
        if (!me) throw new HttpException(404, { error_code: '01', error_message: 'User not found' });
        return me;
    }

    /**
     * Function get id of user data
     *
     * @param {*} userId
     * @return
     */
    static async getUserById(userId: any) {
        const user = await User.findById(userId.id).select('-password');
        if (!user) throw new HttpException(404, { error_code: '01', error_message: 'User not found' });

        return user;
    }

    /**
     * Check the phone number and email has been created or not, if it has already been created, it will not allow to create
     * Check password is not allowed to contain special characters
     * Returns true if valid, otherwise throws an httpexception
     *
     * @param {*} userData
     */

    static async chekingDataUpdateUser(userData: any) {
        const { error } = validateUpdate(userData);
        if (error) throw new HttpException(400, { error_code: '01', error_message: error.details[0].message });

        const existsUser = await User.findOne({ email: userData.email, phoneNumber: userData.phoneNumber });
        if (existsUser)
            throw new HttpException(400, { error_code: '01', error_message: 'Email hoặc số điện thoại đã tồn tại' });

        // password must not contain special characters
        const format = /[^a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/;
        if (format.test(userData.password))
            throw new HttpException(404, {
                error_code: '01',
                error_message: 'Password must not contain special characters'
            });

        return true;
    }

    /**
     * Function update user data
     *
     * @param {*} userDataUpdate
     * @param {*} userId
     * @return
     *
     */
    static async updateUser(userId: any, userDataUpdate: any) {
        await UserService.chekingDataUpdateUser(userDataUpdate);

        const { id } = userId;
        const fields = userDataUpdate;

        const user = await User.findByIdAndUpdate(id, fields, { new: true }).select('-password');
        if (!user) throw new HttpException(400, { error_code: '01', error_message: 'User not found' });

        return user;
    }

    /**
     * Function delete user data
     *
     * @param {*} userDeleteId
     * @return
     */
    static async deleteUser(userDeleteId: any) {
        const { id } = userDeleteId;
        if (!id) {
            throw new HttpException(404, { error_code: '01', error_message: 'id is required' });
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) throw new HttpException(400, { error_code: '01', error_message: 'User not found' });

        return user;
    }
}

export { UserService };
