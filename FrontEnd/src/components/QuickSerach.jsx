import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { makePostRequest } from '../services/ApiCalls';
import DisplayData from './DisplayData';
import Pagination from 'react-bootstrap/Pagination';

function QuickSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdownValue, setDropdownValue] = useState('title');
    const [responseData, setResponseData] = useState([]);
    const [responseStatus, setResponseStatus] = useState(200);
    const [paginationCount, setPaginationCount] = useState(1);
    const [presentPage, setPresentPage] = useState(1);
    const [loading, setLoading] = useState(false); // Loading state

    const QuickSearchField = ["pestle", 'title', 'sector', 'topic', 'url', 'region', 'insight', 'end_year', 'start_year', 'country'];

    const handleClick = (item) => {
        setDropdownValue(item);
    };

    const handleOnChangeSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async (page = 1) => {
        setLoading(true); // Set loading to true when search starts
        let sendDataForSearch = {
            "field": dropdownValue,
            "searchQuery": searchQuery,
            "page": page,
            "limit": 20,
            "PaginationRequest": true
        };
        try {
            const res = await makePostRequest('/dashboard/quickSearchBaseonField', {}, sendDataForSearch, {});
            setResponseStatus(res?.statusCode);
            setResponseData(res?.data[0]);
            if (res.data[1] != null) {
                setPaginationCount(res.data[1]);
            }
        } catch (error) {
            setResponseStatus(500); // Set a status code indicating error
        } finally {
            setLoading(false); // Set loading to false when search completes
        }
    };

    const handlePageClick = (page) => {
        setPresentPage(page);
    };

    useEffect(() => {
        handleSearch(presentPage);
    }, [presentPage]);

    let items = [];
    for (let number = 1; number <= paginationCount; number++) {
        items.push(
            <Pagination.Item key={number} active={number === presentPage} onClick={() => handlePageClick(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: '2px solid #ff9e3d',
            borderRadius: '24px',
            width: '94vw',
            background: '#e3dad1',
            height: "28vh",
            marginTop: '1vh',
            marginLeft: '6vw',
        }}>
            <div style={{
                display: 'flex',
                width: '100%',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '80%',
                    height: "50px",
                    alignItems: 'center',
                    background: '#e3dad1',
                    justifyContent: 'center',
                    margin: 'auto'
                }}>
                    <div style={{
                        flex: 2,
                        height: "45px",
                    }}>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-custom-components" style={{
                                flex: 2,
                                width: '100%',
                                border: '2px solid #ff9e3d',
                                color: 'black',
                                background: '#fff',
                                height: "45px",
                            }}>
                                {dropdownValue}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {QuickSearchField.map((item, index) => (
                                    <Dropdown.Item key={index} onClick={() => handleClick(item)}>{item}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <input style={{
                        flex: 8,
                        border: '2px solid #ff9e3d',
                        color: 'black',
                        background: '#fff',
                        borderRadius: "24px",
                        height: "45px",
                    }}
                        onChange={handleOnChangeSearch}
                        placeholder='Quick Search Based on Field'
                        value={searchQuery}
                    />
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '80%',
                height: "50px",
                alignItems: 'center',
                background: '#e3dad1',
                justifyContent: 'center',
                margin: 'auto'
            }}>
                <Button
                    onClick={() => handleSearch()}
                    style={{
                        width: '250px',
                        height: "45px",
                        background: '#ffcd9c',
                        border: '2px solid #fff',
                        color: '#ff5900'
                    }}>Search</Button>
            </div>
            <div style={{ marginTop: "30vh", width: '90vw', alignItems: 'center', position: 'absolute', zIndex: '100' }}>
                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : responseStatus < 300 ? (
                    Array.isArray(responseData) && responseData.length > 0 ? (
                        responseData.map((item, index) => (
                            <DisplayData key={index} data={item} />
                        ))
                    ) : (
                        "NULL"
                    )
                ) : (
                            <div className='not-found'> N-U-L-L</div>
                )}
            </div>
            <div style={{ overflowX: 'scroll', height: '8vh', background: 'pink', alignItems: 'center' }}>
                <Pagination>{items}</Pagination>
            </div>
        </div>
    )
}

export default QuickSearch;
