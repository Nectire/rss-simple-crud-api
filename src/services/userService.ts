import { User, UserData } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { RequiredFieldsError, UserNotFoundError } from "../errors";

let dataBase: User[] = [];

export class UserService {
  

  getUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      resolve(dataBase);
    });
  }

  getUser(id: string) {
    return new Promise<User | undefined>((resolve, reject) => {
      const user = dataBase.find(user => user.id === id);
      resolve(user);
    })
  }

  createUser(user: UserData) {
    return new Promise<User>((resolve, reject) => {
      const properties = ['username', 'age', 'hobbies'];

      const isValid = properties.every(key => Object.prototype.hasOwnProperty.call(user, key))

      if (!isValid) {
        reject(new RequiredFieldsError());
        return;
      }
      
      const newUser: User = {
        id: uuidv4(),
        ...user
      }
      dataBase.push(newUser);
      resolve(newUser);
    })
  }

  deleteUser(id: string) {
    return new Promise<void>((resolve, reject) => {
      let isUserDeleted = false;

      dataBase = dataBase.filter(user => {
        if(user.id !== id) {
          isUserDeleted = true
          return true
        } else {
          return false
        }
      });
      if (!isUserDeleted) {
        reject(new UserNotFoundError());
      } else {
        resolve();
      }
    })
  }

  updateUser(id: string, userData: UserData) {
    return new Promise<User>((resolve, reject) => {
      let isUserUpdated = false;
      let newUser!: User; 

      dataBase = dataBase.map(user => {
        if (user.id === id) {
          isUserUpdated = true;

          newUser = {
            id: user.id,
            ...userData
          }
          return newUser
        }
        return user;
      });

      if (isUserUpdated) {
        resolve(newUser);
      } else {
        reject(new UserNotFoundError());
      }

    })
  }
}