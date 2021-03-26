import React from 'react'
import {Card,Button} from "react-bootstrap"
function MyCard(props) {
    return (
        <Card  style={{ width: '18rem' }}>
  <Card.Img variant="top" src={props.img} />
  <Card.Body>
    <Card.Title>{props.title}</Card.Title>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
    )
}

export default MyCard
