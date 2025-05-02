import React from 'react';
import { Tooltip } from 'react-tooltip';  
import 'react-tooltip/dist/react-tooltip.css';

import styles from './styles.module.sass';

interface CustomTooltipProps {
  id: string;
  header: string;
  description: string;
  place: 'top' | 'bottom' | 'left' | 'right';
  fontWeight?: string;
  background?: string;
  color?: string;
  offset?: number;
  margin?: string;
  delay?: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  id,
  header,
  description,
  place,
  fontWeight,
  background,
  color,
  offset,
  margin,
  delay,
}) => {
  let weight;

  if (place === 'bottom' && offset === undefined && margin === undefined) {
    offset = 10; // Changed from [10, 10] to a single number
    margin = '50px 0 0 0';
  }

  if (place === 'right') {
    margin = '0 0 0 30px';
  }

  if (!fontWeight) {
    if (!description) {
      weight = '500';
    }
  } else {
    weight = fontWeight;
  }

  return (
    <>
      <Tooltip 
        id={id} 
        place={place}
        className="custom-tooltip"
        style={{
          backgroundColor: background || '#121212',
          color: color || '#ddd',
          fontSize: '14px',
          fontFamily: 'Poppins',
          borderRadius: '5px',
          padding: '12px',
          margin: margin,
          maxWidth: '200px', 
          zIndex: 2000,
        }}
        offset={offset}  // Now expects a number
        delayShow={delay || 0} 
      >
        <div>
          <strong 
            className="tooltip-header" 
            style={{
              fontWeight: weight || '700',
              color: color || '#fff',
              fontSize: '16px'
            }}
          >
            {header}
          </strong>

          <p 
            className="tooltip-description" 
            style={{
              fontWeight: fontWeight || '400',
              color: color || '#ccc'
            }}
          >
            {description}
          </p>
        </div>
      </Tooltip>
    </>
  );
};

export default CustomTooltip;
