import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";

const CollapseCheckBox = (props) => {
  const [checked, setChecked] = useState([]);
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
    props.list.map((value) => (
      <ListItem key={value._id} style={{ padding: "10px 0" }}>
        <ListItemText primary={value.name} />
        <ListItemSecondaryAction>
          <Checkbox
            color="primary"
            onChange={() => toggleHandler(value._id)}
            checked={checked.indexOf(value._id) !== -1}
          />
        </ListItemSecondaryAction>
      </ListItem>
    ));

  const toggleHandler = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.filtersHandler(newChecked);
  };

  return (
    <div className="collapse_items_wrapper">
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
            {renderList()}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default CollapseCheckBox;
