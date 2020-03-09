import "../../styles/newExercisePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addGroup } from '../../redux/actions/groupsAction';

function GroupList(props) {

  const [groupsList, setGroupsList] = useState([]);
  const [newGroup, setNewGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const groups = useSelector(state => state.groups.groups);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (groups) {
      setGroupsList(groups);
    }
  }, [groups])

  return (
    <div>
      <div className="d-lg-none">
        <div className="row my-2 justify-content-center">
          <select value={props.groupValue} className="form-control my-2 px-2 col-12" onChange={onChangeSelectedGroup} >
            <option defaultValue></option>
            {groupsList.map(group => {
              return <Group group={group} key={group._id} />;
            })}
          </select>
          <button
            className="float-right btn btn-outline-success col-6"
            onClick={onNewGroupChange}
          >
            {newGroup ? 'hide' : 'add'}
          </button>
        </div>
        <div
          hidden={!newGroup}
          className="row justify-content-center"
          onSubmit={onGroupSubmit}
        >
          <input
            className="required-class form-control my-2 px-2 col-12"
            type="text"
            name="name"
            placeholder="new group name"
            value={newGroupName}
            onChange={onChangeNewGroupName}
          ></input>
          <button
            className="float-right btn btn-outline-dark col-6"
            onClick={onGroupSubmit}
          >
            add new group
          </button>
        </div>
      </div>
      <div className="d-none d-lg-inline">
        <div className="row my-2">
          <select value={props.groupValue} className="form-control col-7" onChange={onChangeSelectedGroup} >
            <option defaultValue></option>
            {groupsList.map(group => {
              return <Group group={group} key={group._id} />;
            })}
          </select>
          <button
            className="float-right btn btn-outline-success mx-3 col-4"
            onClick={onNewGroupChange}
          >
            {newGroup ? 'hide' : 'add'}
          </button>
        </div>
        <div
          hidden={!newGroup}
          className="row"
          onSubmit={onGroupSubmit}
        >
          <input
            className="required-class form-control my-3 p-3 col-7"
            type="text"
            name="name"
            placeholder="new group name"
            value={newGroupName}
            onChange={onChangeNewGroupName}
          ></input>
          <button
            className="float-right btn btn-outline-dark m-3 col-4"
            onClick={onGroupSubmit}
          >
            add new group
          </button>
        </div>
      </div>
    </div>
  );

  function onNewGroupChange(e) {
    e.preventDefault();

    setNewGroup(!newGroup);
  }

  function onChangeSelectedGroup(e) {
    props.onChangeGroupName(e);
  }

  function onChangeNewGroupName(e) {
    setNewGroupName(e.target.value);
  }

  function onGroupSubmit(e) {
    e.preventDefault();

    if (user) {

      const group = {
        name: newGroupName,
        userid: user._id
      };

      dispatch(addGroup(group));
      clearNewGroup();
    }
  }

  function clearNewGroup() {
    setNewGroupName('');
    setNewGroup(false);
  }
}

function Group(props) {

  return (
    <option value={props.group.name}>{props.group.name}</option>
  );

}

export default GroupList;
