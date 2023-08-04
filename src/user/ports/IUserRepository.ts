/*eslint-disable*/
export interface IUserRepository<T> {
  create<T>(data:T) : Promise<string>
  getAll() : Promise<string>
}
