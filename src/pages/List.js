import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { TableContainer, TableRow, TableHead, Table, TableCell, TableBody, Container } from '@material-ui/core'
import config from '../config'


export const GET_AGENTS = gql`
  query AgentsData{
      getAgents{
        totalAgents
        agents{
            id
            name
            email
            zip_code
            contact_number
            avatar_image_dir
        }
    }
}
`;

const List = () => {
    return (
        <Query query={GET_AGENTS}>
            {({ loading, data }) => {
                if (loading) {
                    return <div style={{ textAlign: 'center' }}>Loading</div>
                }
                if (!loading && data) {
                    const { getAgents } = data;
                    const { agents } = getAgents;
                    console.log(agents)
                    return !loading && (
                        <Container className="minFullHeight">
                            <TableContainer>
                                <Table size="small" aria-label="simple table" className="bg-white " stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><strong>Name</strong></TableCell>
                                            <TableCell align="center"><strong>Email</strong></TableCell>
                                            <TableCell align="center"><strong>Zip Code</strong></TableCell>
                                            <TableCell align="center"><strong>Phone</strong></TableCell>
                                            <TableCell align="center"><strong>Preview</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {agents.map(row => (
                                            <TableRow key={row.id}>
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">{row.email}</TableCell>
                                                <TableCell align="center">{row.zip_code}</TableCell>
                                                <TableCell align="center">{row.contact_number}</TableCell>
                                                <TableCell align="center"><img src={config.url + row.avatar_image_dir} height={80} width={80} alt="preview" /></TableCell>

                                            </TableRow>
                                        ))}
                                        {agents.length === 0 && (
                                            <TableRow style={{ height: 33 }}>
                                                <TableCell colSpan={18} align="center" >
                                                    No Record Found
                                    </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>

                                </Table>

                            </TableContainer>
                        </Container>
                    )
                }
            }
            }

        </Query>

    )
}

export default List




