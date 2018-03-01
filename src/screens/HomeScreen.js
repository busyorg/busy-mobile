import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import ToolbarMenu from '../components/ToolbarMenu';
import FeedContainer from '../feed/FeedContainer';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: params.tag || 'Feed',
      headerRight: params.headerRight,
    };
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  state = {
    sort: 'trending',
  };

  componentWillMount() {
    this.setNavigationParams();
  }

  setNavigationParams = () => {
    const headerRight = (
      <ToolbarMenu title='Sort by' options={['Trending', 'New', 'Active', 'Hot']} onSelect={this.handleSelect}>
        <MaterialIcons name="sort" size={28} color="white" />
      </ToolbarMenu>
    );

    this.props.navigation.setParams({
      headerRight,
    });
  };

  getSort = id => {
    switch (id) {
      case 0:
        return 'trending';
      case 1:
        return 'created';
      case 2:
        return 'active';
      case 3:
        return 'hot';
      default:
        return 'trending';
    }
  };

  handleSelect = id => {
    const sort = this.getSort(id);
    this.setState({
      sort,
    });
  };

  render() {
    const { navigation } = this.props;
    const { sort } = this.state;

    const params = navigation.state.params || {};

    return <FeedContainer sortBy={sort} tag={params.tag} />;
  }
}
