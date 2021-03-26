import React from 'react'
import {ListGroup} from "react-bootstrap"
function List(props) {
    return (
        <div>
            <ListGroup key={props.key}>
                <ListGroup.Item>{props.title}</ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default List
