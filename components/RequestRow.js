import React from "react";
import { Table, Button } from 'semantic-ui-react';
import { Link } from '../routes';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';


 
const RequestRow = (props) => {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    const onApprove = async () => {
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(props.address);
        await campaign.methods.approveRequest(props.id)
            .send({ from: accounts[0] });
    };

    const onFinalize = async () => {
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(props.address);
        await campaign.methods.finalizeRequest(props.id)
            .send({ from: accounts[0] });
    }

    return (
        <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell>{request.approvalCount}/{approversCount}</Cell>
            <Cell>
                {request.complete ? null : (
                    <Button color="green" basic onClick={onApprove}>Approve</Button>
                )}
            </Cell>
            
            <Cell>
                {request.complete ? null : (
                    <Button color="teal" basic onClick={onFinalize}>Finalize</Button>
                )}
            </Cell>
        </Row>
    );
};

export default RequestRow;