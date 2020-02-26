import React, {Component} from 'react';

import {WebView} from 'react-native-webview';

// import { Container } from './styles';

export default class RepoStarred extends Component {
  componentDidMount() {
    const {
      route: {
        params: {repo},
      },
      navigation,
    } = this.props;

    navigation.setOptions({
      title: repo.name,
    });
  }

  render() {
    const {
      route: {
        params: {repo},
      },
    } = this.props;

    return <WebView source={{uri: repo.html_url}} style={{flex: 1}} />;
  }
}
