/** @jsx jsx */
import { jsx } from '@emotion/core';
import { CSSProperties, FunctionComponent } from 'react';
import { StyledGraphContainer, GraphProps } from './Graph';
import { ScrollView } from './ScrollView';

export interface ScrollGraphProps extends GraphProps {
  className?: string;
  scaleX?: number;
  scaleY?: number;
  style?: CSSProperties;
}

export const ScrollGraph: FunctionComponent<ScrollGraphProps> = ({
  className,
  scaleX,
  scaleY,
  style,
  ...rest
}) => (
  <ScrollView scaleX={scaleX} scaleY={scaleY} className={className} style={style}>
    <StyledGraphContainer
      style={{
        width: `${(scaleX || 1) * 100}%`,
        height: `${(scaleY || 1) * 100}%`,
      }}
      {...rest}
    />
  </ScrollView>
);

ScrollGraph.defaultProps = {
  scaleX: 1,
  scaleY: 1,
};
