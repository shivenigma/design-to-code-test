import React from 'react';

interface TileProps {
  value: number;
  position: {
    row: number;
    col: number;
  };
}

const Tile: React.FC<TileProps> = ({ value }) => {
  // Determine background color based on tile value
  const getBackgroundClass = () => {
    switch (value) {
      case 2:
        return 'lmnt-theme-surface-bg';
      case 4:
        return 'lmnt-theme-surface-bg';
      case 8:
        return 'lmnt-theme-primary-bg';
      case 16:
        return 'lmnt-theme-primary-bg';
      case 32:
        return 'lmnt-theme-primary-variant-bg';
      case 64:
        return 'lmnt-theme-primary-variant-bg';
      case 128:
        return 'lmnt-theme-secondary-bg';
      case 256:
        return 'lmnt-theme-secondary-bg';
      case 512:
        return 'lmnt-theme-secondary-variant-bg';
      case 1024:
        return 'lmnt-theme-secondary-variant-bg';
      case 2048:
        return 'lmnt-theme-success-bg';
      default:
        return 'lmnt-theme-surface-bg';
    }
  };

  // Determine text color based on tile value
  const getTextClass = () => {
    if (value <= 4) {
      return 'lmnt-theme-on-surface';
    } else {
      return 'lmnt-theme-on-primary';
    }
  };

  // Determine font size based on tile value
  const getFontSizeClass = () => {
    if (value < 100) {
      return 'text-2xl md:text-3xl';
    } else if (value < 1000) {
      return 'text-xl md:text-2xl';
    } else {
      return 'text-lg md:text-xl';
    }
  };

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center rounded-md shadow-md 
        ${getBackgroundClass()} ${getTextClass()} font-bold
        animate-[appear_0.2s_ease-in-out]`}
    >
      <span className={getFontSizeClass()}>{value}</span>
    </div>
  );
};

export default Tile;