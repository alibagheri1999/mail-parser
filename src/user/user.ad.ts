import { Injectable } from '@nestjs/common';
import { AD } from 'ad';

@Injectable()
export class UserAD extends AD {
  constructor() {
    // to get parent properties
    super();
  }

  async addUser(userProperty, age) {
    // to do traditional addUser
    await super.addUser(userProperty);
    // adding age to do sth more like logging
    console.log(`Now we have age : ${age} for the rest of process`);
  }
}
