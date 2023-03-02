// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  contractsDataValidator,
  contractsPatchValidator,
  contractsQueryValidator,
  contractsResolver,
  contractsExternalResolver,
  contractsDataResolver,
  contractsPatchResolver,
  contractsQueryResolver
} from './contracts.schema.js'
import { ContractsService, getOptions } from './contracts.class.js'
import { contractsPath, contractsMethods } from './contracts.shared.js'

export * from './contracts.class.js'
export * from './contracts.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const contracts = (app) => {
  // Register our service on the Feathers application
  app.use(contractsPath, new ContractsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: contractsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(contractsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(contractsExternalResolver),
        schemaHooks.resolveResult(contractsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(contractsQueryValidator),
        schemaHooks.resolveQuery(contractsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(contractsDataValidator),
        schemaHooks.resolveData(contractsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(contractsPatchValidator),
        schemaHooks.resolveData(contractsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
