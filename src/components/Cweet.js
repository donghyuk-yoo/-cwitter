import React from 'react';

const Cweet = ({ cweetObj, isOwner }) => (
  <div>
    <h4>{cweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Delete Cweet</button>
        <button>Edit Cweet</button>
      </>
    )}
  </div>
);

export default Cweet;