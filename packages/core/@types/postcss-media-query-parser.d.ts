declare module 'postcss-media-query-parser' {
  export interface MediaQueryListNode extends import('postcss').Node {
    type: 'media-query-list';
    nodes: MediaQueryNode[];
  }

  export interface MediaQueryNode extends import('postcss').Node {
    type: 'media-query';
    nodes: (KeywordNode | MediaTypeNode | MediaFeatureExpressionNode)[];
  }

  export interface KeywordNode extends import('postcss').Node {
    type: 'keyword';
    // value: '@media' | 'not' | 'only' | 'and';
  }

  export interface MediaTypeNode extends import('postcss').Node {
    type: 'media-type';
  }

  export interface ColonNode extends import('postcss').Node {
    type: 'keyword';
    value: ':';
  }

  export interface ValueNode extends import('postcss').Node {
    type: 'value';
  }

  export interface MediaFeatureExpressionNode extends import('postcss').Node {
    type: 'media-feature-expression';
    nodes: [MediaFeatureNode, ColonNode, ValueNode];
  }

  export interface MediaFeatureNode extends import('postcss').Node {
    type: 'media-feature';
  }

  // eslint-disable-next-line import/no-default-export
  export default function parseMedia(mediaQuery: string, index = 0): MediaQueryListNode;
}
