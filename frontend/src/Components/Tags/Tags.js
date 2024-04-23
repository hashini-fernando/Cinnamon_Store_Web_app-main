import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './Tags.module.css';
import Axios from 'axios';

export default function Tags({ forOurProducts }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
  
    Axios.get('/api/tags') 
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
      });
  }, []);

  const handleTagClick = (tag) => {
    console.log(`Clicked tag: ${tag.name}`);
  };

  return (
    <div
      className={classes.container}
      style={{
        justifyContent: forOurProducts ? 'start' : 'center',
      }}
    >
      {tags.map(tag => (
        <Link
          key={tag.name}
          to={`/tag/${tag.name}`}
          onClick={() => handleTagClick(tag)}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
