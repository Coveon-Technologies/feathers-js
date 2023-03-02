// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const contractsSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Contracts', additionalProperties: false }
)
export const contractsValidator = getValidator(contractsSchema, dataValidator)
export const contractsResolver = resolve({})

export const contractsExternalResolver = resolve({})

// Schema for creating new entries
export const contractsDataSchema = Type.Pick(contractsSchema, ['text'], {
  $id: 'ContractsData'
})
export const contractsDataValidator = getValidator(contractsDataSchema, dataValidator)
export const contractsDataResolver = resolve({})

// Schema for updating existing entries
export const contractsPatchSchema = Type.Partial(contractsSchema, {
  $id: 'ContractsPatch'
})
export const contractsPatchValidator = getValidator(contractsPatchSchema, dataValidator)
export const contractsPatchResolver = resolve({})

// Schema for allowed query properties
export const contractsQueryProperties = Type.Pick(contractsSchema, ['id', 'text'])
export const contractsQuerySchema = Type.Intersect(
  [
    querySyntax(contractsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const contractsQueryValidator = getValidator(contractsQuerySchema, queryValidator)
export const contractsQueryResolver = resolve({})
