import React from "react";
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

const RequestIndex = (props) => {
    const { Header, Row, HeaderCell, Body } = Table;

    const renderRows = () => {
        return props.requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={props.address}
                approversCount={props.approversCount}
            />;
        })
    }

    return (
        <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${props.address}/requests/new`}>
                <a>
                    <Button primary floated="right" style={{ marginBottom: 10 }}>Add Request</Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {renderRows()}
                </Body>
            </Table>
            <div> Found {props.requestsCount} requests.</div>
        </Layout>
    );
};

RequestIndex.getInitialProps = async (props) => {
    const { address } = props.query;

    const campaign = Campaign(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
        Array(parseInt(requestsCount))
            .fill()
            .map((element, index) => {
            return campaign.methods.requests(index).call()
        })
    );

    return { address, requests, requestsCount, approversCount };
};

export default RequestIndex;