export const contractsPath = 'contracts'

export const contractsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const contractsClient = (client) => {
  const connection = client.get('connection')

  client.use(contractsPath, connection.service(contractsPath), {
    methods: contractsMethods
  })
}
