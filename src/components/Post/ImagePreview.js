// @flow

import { Dimensions } from 'react-native';
import styled from 'styled-components';

const window = Dimensions.get('window');

const ImagePreview = styled.Image`
  width: 100%;
  height: ${window.width / 16 * 9};
`;

export default ImagePreview;
