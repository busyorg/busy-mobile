import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    padding: 8,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
  },
  button: {
    marginBottom: 8,
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  static propTypes = {
    value: PropTypes.number,
    increase: PropTypes.func,
    increaseAsync: PropTypes.func,
  };

  static defaultProps = {
    value: 0,
    increase: () => {},
    increaseAsync: () => {},
  };

  onPress = () => {
    this.props.increase();
  };

  onPressAsync = () => {
    this.props.increaseAsync();
  };

  render() {
    const { value } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{value}</Text>
        </View>
        <View>
          <View style={styles.button}>
            <Button title="Increase" onPress={this.onPress} />
          </View>
          <Button title="Increase with delay" onPress={this.onPressAsync} />
        </View>
      </View>
    );
  }
}

export default connect(
  ({ value }) => ({
    value,
  }),
  dispatch => ({
    increase: () => dispatch({ type: 'INCREMENT' }),
    increaseAsync: () => dispatch({ type: 'INCREMENT_ASYNC' }),
  }),
)(HomeScreen);
