import React from 'react';
import PropTypes from 'prop-types';
import styles from 'react-native-simple-markdown/styles';
import Markdown from 'react-native-simple-markdown';
import deferComponentRender from '../components/deferComponentRender';

const mdStyles = {
  codeBlock: {
    ...styles.codeBlock,
    fontFamily: 'space-mono',
    fontWeight: '400',
  },
  inlineCode: {
    ...styles.inlineCode,
    fontFamily: 'space-mono',
  },
  paragraph: {
    ...styles.paragraph,
    paddingTop: 8,
    paddingBottom: 8,
  },
};

const MarkdownRenderer = ({ body }) => <Markdown styles={mdStyles}>{body}</Markdown>;
MarkdownRenderer.propTypes = {
  body: PropTypes.string,
};
MarkdownRenderer.defaultProps = {
  body: '',
};

export default deferComponentRender(MarkdownRenderer);
