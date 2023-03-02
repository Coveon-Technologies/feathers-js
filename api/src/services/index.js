import { contracts } from './contracts/contracts.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(contracts)

  app.configure(user)

  // All services will be registered here
}
