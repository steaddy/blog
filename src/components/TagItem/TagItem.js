import React from 'react'
import classes from './TegItem.module.css';

const TagItem = ({ tag }) => {
  return (
    <div className={classes.tag}>
        {tag}
    </div>
  )
}

export default TagItem
