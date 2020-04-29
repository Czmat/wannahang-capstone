import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EditEventButton({ eventDetail, setRenderEventEdit }) {
  return (
    <div>
      <button
        className="btn btn-warning"
        onClick={() => {
          setRenderEventEdit(true);
        }}
      >
        Edit
      </button>
    </div>
  );
}
