import React, {Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';


function CampaignIndex({ campaigns }) {
    console.log("campaigns", campaigns);

    const renderCampaigns = () => {
        const items = campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`#/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true                         // Stretch from left to right
            };
        });

        return <Card.Group items={items} />;
    };

    return <Layout>
        <div>
            
            <h3>Open Campaigns</h3>
            <Link route="/campaigns/new">
                <a>
                    <Button floated="right" content="Create Campaign" icon="add circle" primary={true} />
                </a>
            </Link>
            {renderCampaigns()}
        </div>
    </Layout>;
  }

// uses server side rendering to call the campaign contracts (so good for slow devices)
// getInitialProps is a function that is run by next.js on the server (as an alternative to componentDidMount)
CampaignIndex.getInitialProps = async () => {
    // This will still run even if we disable javascript in the browser.
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
};

// Next expects we export some react component
export default CampaignIndex;