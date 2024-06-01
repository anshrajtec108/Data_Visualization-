import React, { useState, useEffect } from 'react';
import FilterDropdown from './FilterDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import { makePostRequest } from '../services/ApiCalls';
import { useSelector } from 'react-redux';
import DisplayData from './DisplayData';

function SearchFiter() {
  const searchAndFilter = useSelector((store) => store.searchQuery);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownValue, setDropdownValue] = useState('title');
  const [result, setResult] = useState([]);
  const [resultStatus, setResultStatus] = useState(200);
  const [paginationCount, setPaginationCount] = useState(1);
  const [presentPage, setPresentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const SearchField = ['title', 'url', 'insight'];

  const handelClick = (item) => {
    setDropdownValue(item);
  };

  const handelOnChangeSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (page = 1) => {
    setLoading(true);
    const sendDataForSearch = {
      "topic": searchAndFilter?.topic,
      "sector": searchAndFilter?.sector,
      "region": searchAndFilter?.region,
      "country": searchAndFilter?.country,
      "pestle": searchAndFilter?.pestle,
      "searchQuery": {
        'field': dropdownValue,
        'query': searchQuery
      },
      "page": page,
      "limit": 10
    };
    try {
      const res = await makePostRequest('/dashboard/mutipleFilter', {}, sendDataForSearch, {});
      setResultStatus(res?.statusCode);
      setResult(res.data[0]);
      if (res.data[1] != null) {
        setPaginationCount(res.data[1]);
      }
    } catch (error) {
      setResultStatus(500);
    } finally {
      setLoading(false);
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
      height: "35vh",
      marginTop: '1vh',
      marginLeft: '6vw',
    }} >

      {/* Search */}
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
              {SearchField.map((item, index) => (
                <Dropdown.Item key={index} onClick={() => handelClick(item)}>{item}</Dropdown.Item>
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
          onChange={handelOnChangeSearch}
          placeholder='Search (Optional)'
          value={searchQuery}
        />
      </div>

      {/* Filter */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        height: "50px",
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 'auto'
      }}>
        <FilterDropdown FilterField={'country'} />
        <FilterDropdown FilterField={'topic'} />
        <FilterDropdown FilterField={'sector'} />
        <FilterDropdown FilterField={'pestle'} />
        <FilterDropdown FilterField={'region'} />
      </div>

      {/* Search Button */}
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

      {/* Results */}
      <div style={{ marginTop: "36vh", width: '90vw', alignItems: 'center', position: 'absolute', zIndex: '100' }}>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : resultStatus < 300 ? (
          Array.isArray(result) && result.length > 0 ? (
            result.map((item, index) => (
              <DisplayData key={index} data={item} />
            ))
          ) : (
            "NULL"
          )
        ) : (
          <div className='not-found'>Data Not Found</div>
        )}
      </div>

      {/* Pagination */}
      <div style={{ overflowX: 'scroll', height: '8vh', background: 'pink', alignItems: 'center' }}>
        <Pagination>{items}</Pagination>
      </div>
    </div>
  );
}

export default SearchFiter;
