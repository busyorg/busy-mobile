import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import moment from 'moment';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerText: {
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  author: {},
  date: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  image: {
    width: window.width,
    height: window.width / 16 * 9,
  },
  title: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  titleNoImage: {
    paddingTop: 0,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  support: {
    padding: 16,
  },
  supportText: {
    fontSize: 14,
  },
});

export default class FeedItem extends React.PureComponent {
  static propTypes = {
    author: PropTypes.string,
    title: PropTypes.string,
    created: PropTypes.string,
    image: PropTypes.string,
  };

  static defaultProps = {
    author: '',
    title: '',
    created: '',
    image: null,
  };

  render() {
    const { author, title, created, image } = this.props;

    let titleStyle = styles.title;
    if (!image) {
      titleStyle = StyleSheet.flatten([styles.title, styles.titleNoImage]);
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{ uri: `https://steemitimages.com/u/${author}/avatar` }}
          />
          <View style={styles.headerText}>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.date}>{moment(created).fromNow()}</Text>
          </View>
        </View>
        {image && <Image style={styles.image} source={{ uri: image }} />}
        <View style={titleStyle}>
          <Text style={styles.titleText} numberOfLines={3}>
            {title}
          </Text>
        </View>
        <View style={styles.support}>
          <Text style={styles.supportText}>
            These blocks can be organized to promote different types of content. For example,
            numbers may be emphasized by increasing their typographic scale.
          </Text>
        </View>
      </View>
    );
  }
}
