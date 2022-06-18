import { mockUserData, newUser } from '../mocks';
import { UserService } from './userService';

describe('CRUD /api/users', () => {

  let userService: UserService;

  beforeAll(() => {
    userService = new UserService();
  });

  it('Should return empty array successfully', async () => {
    const users = await userService.getUsers();
    expect(users).toEqual([]);
  });

  it('Should create new user successfully', async () => {
    const user = await userService.createUser(mockUserData);
    expect(user.id).toBeTruthy();
    expect(user.username).toEqual(mockUserData.username);
    expect(user.age).toEqual(mockUserData.age);
    expect(user.hobbies).toEqual(mockUserData.hobbies);
  });

  it('Should create and update user successfully', async () => {
    let id = '';
    const user = await userService.createUser(mockUserData);
    expect(user.id).toBeTruthy();
    id = user.id;
    const updatedUser = await userService.updateUser(user.id, newUser);
    expect(updatedUser.id).toEqual(user.id);
    expect(updatedUser.username).toEqual(newUser.username);
    expect(updatedUser.age).toEqual(newUser.age);
    expect(updatedUser.hobbies).toEqual(newUser.hobbies);
  });

  it('Should create and delete user successfully', async () => {
    let id = '';
    const newUser = await userService.createUser(mockUserData);
    expect(newUser.id).toBeTruthy();
    id = newUser.id;
    await userService.deleteUser(id);
    const user = await userService.getUser(id);

    expect(user).toBe(undefined);
  });
});