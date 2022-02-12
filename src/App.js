import React, { useState, useEffect, useRef } from 'react';
import Values from 'values.js';
import { IoReturnDownForward } from 'react-icons/io5';
import Color from './Color';

function App() {
  // USE-STATES
  const [colors, setColors] = useState(new Values('#de3423').all(10));
  const hexCodeRef = useRef(null);
  const percentRef = useRef(null);
  const [error, setError] = useState({ hexErr: false, perErr: false });

  // FUNCTIONS
  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ hexErr: false, perErr: false });
    try {
      const hexCode = hexCodeRef.current.value;
      const percent = Number(percentRef.current.value);

      if (!percent || percent > 100 || percent < 1)
        throw new Error('no percent');
      setColors(new Values(hexCode).all(percent));
      hexCodeRef.current.blur();
      percentRef.current.blur();
    } catch (e) {
      console.log(e.message);
      if (e.message === 'no percent') setError({ ...error, perErr: true });
      else setError({ hexErr: true, perErr: false });
    }
  };
  return (
    <section>
      <header>
        <h1>color generator</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={`${error.hexErr ? 'error' : ''}`}
            type='text'
            placeholder='#de3423'
            maxLength={7}
            ref={hexCodeRef}
          />
          <input
            type='number'
            placeholder='10'
            ref={percentRef}
            className={`${error.perErr ? 'error' : ''}`}
          />
          <p className='info'>Percentage of added shade/tint</p>
          <button className='enter-btn' type='submit'>
            <IoReturnDownForward />
          </button>
        </form>
      </header>

      <article>
        {colors.map((color, ind) => {
          return <Color key={ind} {...color} />;
        })}
      </article>
    </section>
  );
}

export default App;
