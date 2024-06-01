import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DisplayData from './DisplayData';
import { makeGetRequest } from '../services/ApiCalls';

function TopData() {
    const [topEventResult, setTopEventResult] = useState([]);
    const [recentResult, setRecentResult] = useState([]);
    const [endResult, setEndResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const topEventRes = await makeGetRequest('/dashboard/topEvents', {}, {});
            const recentRes = await makeGetRequest('/dashboard/recentPublished', {}, {});
            const endRes = await makeGetRequest('/dashboard/endingDate', {}, {});

            setTopEventResult(topEventRes.data);
            setRecentResult(recentRes.data);
            setEndResult(endRes.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <header>
                    <Tabs defaultActiveKey="top-events" id="justify-tab-example" className="mb-3" fill>
                        <Tab eventKey="top-events" title="Top Events">
                            {Array.isArray(topEventResult) && topEventResult.length > 0 ? (
                                topEventResult.map((item, index) => (
                                    <DisplayData key={index} data={item} />
                                ))
                            ) : (
                                <div className="not-found">Data Not Found</div>
                            )}
                        </Tab>
                        <Tab eventKey="recent-published" title="Recent Published">
                            {Array.isArray(recentResult) && recentResult.length > 0 ? (
                                recentResult.map((item, index) => (
                                    <DisplayData key={index} data={item} />
                                ))
                            ) : (
                                <div className="not-found">Data Not Found</div>
                            )}
                        </Tab>
                        <Tab eventKey="end" title="Ending">
                            {Array.isArray(endResult) && endResult.length > 0 ? (
                                endResult.map((item, index) => (
                                    <DisplayData key={index} data={item} />
                                ))
                            ) : (
                                <div className="not-found">Data Not Found</div>
                            )}
                        </Tab>
                    </Tabs>
                </header>
            )}
        </div>
    );
}

export default TopData;
