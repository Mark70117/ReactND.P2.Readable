import React from 'react';
import { NavLink } from 'react-router-dom';

const InvalidResource = () =>
  <div>
    <NavLink to="/">Home</NavLink>
    <br />
    Invalid resource
  </div>;

export default InvalidResource;
