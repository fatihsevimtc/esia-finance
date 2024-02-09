import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faSync, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showInstruction, setShowInstruction] = useState(true);
    const [sortConfig, setSortConfig] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleSync = async () => {
        setShowInstruction(false);
        setData(null);
        setLoading(true);
        try {
            const response = await axios.get('https://asiafinanse.azurewebsites.net/api/sync');
            setData(response.data);
        } catch (error) {
            console.error('Error syncing data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setData(null);
        setLoading(false);
        setShowInstruction(true);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    let sortedData = data && data.data ? [...data.data.syncedRecords] : [];
    if (sortConfig !== null) {
        sortedData.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

    const paginatedData = sortedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <NavLink className="navbar-brand" to="/dashboard">Dashboard</NavLink>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleSync}>Sync</button>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeclassname="active" to="/dashboard/profile">Profile</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeclassname="active" to="/dashboard/settings">Settings</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                {showInstruction && (
                    <div className="alert alert-info text-center d-flex flex-column align-items-center" role="alert">
                        Please hit the "Sync" button to start the synchronization process. The results will be displayed on this page once the sync is complete.
                        <Button variant="primary" size="lg" onClick={handleSync} className="mt-4">
                            <FontAwesomeIcon icon={faSync} /> Sync
                        </Button>
                    </div>
                )}
                {!showInstruction && !loading && (
                    <Button variant="secondary" size="lg" onClick={handleClear} className="mt-4">
                        Clear
                    </Button>
                )}
                {loading && (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p>Data being fetched. Please wait...</p>
                    </div>
                )}
                {data && data.data && data.data.syncedRecords && (
                    <div>
                        <h3>Financial data sync results</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort('customer')}>Netsuite Record ID</th>
                                    <th onClick={() => handleSort('recordType')}>Record Type</th>
                                    <th onClick={() => handleSort('syncAction')}>Sync Action</th>
                                    <th>Open in NetSuite</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.customer || record.invoice}</td>
                                        <td>{record.customer ? 'Customer' : 'Invoice'}</td>
                                        <td>{record.syncAction}</td>
                                        <td>
                                            <a
                                                href={record.customer ? `https://1008392-sb1.app.netsuite.com/app/common/entity/custjob.nl?id=${record.customer}` : `https://1008392-sb1.app.netsuite.com/app/accounting/transactions/custinvc.nl?id=${record.invoice}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FontAwesomeIcon icon={faExternalLinkAlt} /> Open
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="row justify-content-center">
                            <div className="col-md-2">
                                <Button
                                    size="sm"
                                    className="w-100 mr-md-2 mb-2 mb-md-0"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 0}
                                >
                                    Previous Page
                                </Button>
                            </div>
                            <div className="col-md-2">
                                <Button
                                    size="sm"
                                    className="w-100"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={(currentPage + 1) * itemsPerPage >= sortedData.length}
                                >
                                    Next Page
                                </Button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;