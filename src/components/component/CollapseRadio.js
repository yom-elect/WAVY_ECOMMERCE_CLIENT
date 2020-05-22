import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CollapseRadio = (props) => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.initState) {
      setOpen(props.initState);
    }
  }, [props]);

  const clickHandler = () => {
    setOpen(!open);
  };

  const dropHandler = () =>
    open ? (
      <FontAwesomeIcon icon={faAngleUp} className="icon" />
    ) : (
      <FontAwesomeIcon icon={faAngleDown} className="icon" />
    );

  const renderList = () =>
    props.list
      ? props.list.map((value) => (
          <FormControlLabel
            key={value._id}
            value={`${value._id}`}
            control={<Radio />}
            label={value.name}
          />
        ))
      : null;
  const changeHandler = (event) => {
    props.filtersHandler(event.target.value);
    setValue(event.target.value);
  };

  return (
    <div>
      <List style={{ borderBottom: "1px solid #dbdbdb" }}>
        <ListItem
          onClick={clickHandler}
          style={{ padding: "10px 23px 10px 0" }}
        >
          <ListItemText primary={props.title} className="collapse_title" />
          {dropHandler()}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <RadioGroup
              aria-label="prices"
              name="prices"
              value={`${value}`}
              onChange={changeHandler}
            >
              {renderList()}
            </RadioGroup>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default CollapseRadio;
