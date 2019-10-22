import React from 'react';
import PropTypes from 'prop-types';
import style from './hello-world.css';

const HelloWorld = ({ number, title }) => (
  <div className={style['hello-world']}>
    {title}
    <br />
    Number: {number}, Square: {number ** 2}
  </div>
);

HelloWorld.propTypes = {
  number: PropTypes.number,
  title: PropTypes.string,
};

export default HelloWorld;
