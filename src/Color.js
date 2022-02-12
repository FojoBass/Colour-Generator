import React from 'react';

const converter = (num) => {
  num = num.toString(16);
  return num.length > 1 ? num : '0' + num;
};

const Color = ({ rgb, weight, type }) => {
  const [copied, setCopied] = React.useState(false);

  const hex = rgb.map((r) => converter(r)).join('');

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(`#${hex}`);
  };

  React.useEffect(() => {
    const copiedTime = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => {
      clearTimeout(copiedTime);
    };
  }, [copied]);
  return (
    <div
      className={`${type === 'tint' ? 'color tint' : 'color shade'}`}
      style={{ backgroundColor: `#${hex}` }}
      onClick={handleCopy}
    >
      <div className='content'>
        <p className='name'>#{hex}</p>
        <h3 className='percent'>{weight}%</h3>

        <div className={`${copied ? 'alert copied' : 'alert'}`}>
          copied to clipboard
        </div>
      </div>
    </div>
  );
};

export default Color;
