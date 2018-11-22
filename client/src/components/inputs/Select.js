import React from 'react';

const Select = (props) => (
  <div className="select">
    <select onChange={props.handleChange} name="genre">
      <option value=""></option>
      <option value="Action">Action</option>
      <option value="Animation">Animation</option>
      <option value="Anime">Anime</option>
      <option value="Arthouse">Arthouse</option>
      <option value="Arts Entertainment and Culture">Arts Entertainment and Culture</option>
      <option value="Comedy">Comedy</option>
      <option value="Documentary">Documentary</option>
      <option value="Drama">Drama</option>
      <option value="Erotic">Erotic</option>
      <option value="Faith and Spirituality">Faith and Spirituality</option>
      <option value="Fantasy">Fantasy</option>
      <option value="Fitness">Fitness</option>
      <option value="Horror">Horror</option>
      <option value="International">International</option>
      <option value="Kids">Kids</option>
      <option value="LGBTQ">LGBTQ</option>
      <option value="Military and War">Military and War</option>
      <option value="Music Videos and Concerts">Music Videos and Concerts</option>
      <option value="Romance">Romance</option>
      <option value="Science Fiction">Science Fiction</option>
      <option value="Sports">Sports</option>
      <option value="Suspense">Suspense</option>
      <option value="Talk Show and Variety">Talk Show and Variety</option>
      <option value="Western">Western</option>
      <option value="Young Adult Audience">Young Adult Audience</option>
    </select>
    <label htmlFor="genre">Genre</label>
  </div>
);

export default Select;
