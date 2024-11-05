import { Col, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../style.css";
import { Props, NewDocument } from "./interfaces/types";

const GeoreferenceSelection = (props: Props) => {
  /* 
  The mockup let the urban-planner choose between Area and Location
  We do not have to to the Area in this user stories
  so we will implement just the location (lat, long)
  
  declare one variable for georeference

  declare one variable for latitude and one for longitude

  the form shold be something like
  const [georeference, setGeoreference] = useState(
      props.document ? props.document.georeference : [[]]
  );

  for latitude and longitude just initilize them at 0
  */

  /*
  consider than georeference is composed of [lat, long]
  so everytime the urban-planner update the values of
  lat or long, we have to update the local georeference
  */

  /*
  based on the other form we can use the useEffect to update
  the props.document.georeference
  
  ask our friend about this to be sure 
  the useEffect is called ath the right time
  */

  /*
  help yourself looking at other file
  the most similar is probably PageSelection
  but remember that our form need number as input
  */
  return (
    /* everything goes into a Form.Group  */
    /* Form.Label */
    /* 2 Form.Control
      - 1 for lat
      - 1 for long
    
    <Form.Control
      type="number"
      step="0.01" //this is really important because we have float number
      value={lat/long}
      onChange={(event) => setLat/setLong(event.target.value)}
      placeholder="Latitude/Longitude"
      className="font-size-20" //uniform to other Form
    />

    the form stays in different rows since we do not have a large space
    */
  );
};

export default GeoreferenceSelection;
