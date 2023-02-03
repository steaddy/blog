import React from 'react'
import classes from './TegItem.module.css';

const TagItem = ({ tag, id, deleteTag }) => {
  return (
    <div className={classes.tag}>
        {tag}
        <button onClick={(e)=> {
          e.preventDefault();
          deleteTag(id);
        }}>Delete</button>
    </div>
  )
}

export default TagItem
