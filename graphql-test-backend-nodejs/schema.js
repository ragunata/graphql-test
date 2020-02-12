const { buildSchema } = require('graphql');
 const schema = buildSchema( `
    scalar Upload
    type Agents {
        id: Int,
    	name:String,
	    email:String,
	    contact_number:String,
	    address:String,
	    zip_code:String,
	    avatar_image_dir:String,
	    license_image_dir:String,
	    createdAt:String,
    }
    type AgentsData {
        agents: [Agents],
        page: Int,
        totalAgents: Int
    }
    type Query {
        getAgents(page: Int): AgentsData
    }
    input AgentInput
    {
        name:String,
        email:String,
        contact_number:String,
        address:String,
        zip_code:String,
        license_image_dir:String,
        avatar_image_dir:String
    }
    type Mutation {
        addAgents(input: AgentInput): Agents
    }
`);

 module.exports = { schema};
