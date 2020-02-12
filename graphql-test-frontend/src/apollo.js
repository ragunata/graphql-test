import ApolloClient from 'apollo-boost';
import config from './config'

const client = new ApolloClient({
    uri: `${config.url}/graphql`
})

export default client