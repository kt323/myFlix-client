import React from 'react';
import "./book-view.scss";
import { Row, Col, Button } from "react-bootstrap";

export const BookView = ({ book, onBackClick }) => {
    return (
        <Row className="justify-content-md-center">
            <Col md={7} className="col-12">
                <img src={book.image} alt="" className="mx-auto w-100" />
            </Col>
            <Col md={5} className="col-12">
                <div className="my-1">
                    <span className="h1">{book.Title}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Description:</span>
                    <span>{book.Description}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Author: </span>
                    <span>{book.Author.Name}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Genre: </span>
                    <span>{book.Genre.Name}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Year: </span>
                    <span>{book.Year}</span>
                </div>
                <Button className="back-button" style={{ cursor: "pointer" }} onClick={onBackClick}>Back</Button>
            </Col>
        </Row>
    );
};
