import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminPanel() {
    return (
        <div className="container mt-5 mb-5">
            <h1 className="mb-4 text-center">Admin Panel</h1>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Item Management</h5>
                            <p className="card-text">Manage your items here. You can add, edit, or delete items.</p>
                            <Link to="/admin/items" className="btn btn-dark">Go to Item Management</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Auction Management</h5>
                            <p className="card-text">Manage your auctions here. You can create, edit, or delete auctions.</p>
                            <Link to="/AuctionManagement" className="btn btn-dark">Go to Auction Management</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Seller Management</h5>
                            <p className="card-text">Manage sellers here. You can view or manage seller profiles.</p>
                            <Link to="/admin/sellers" className="btn btn-dark">Go to Seller Management</Link>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
}
