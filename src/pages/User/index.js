import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Starred,
  Stars,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
    page: 1,
    otherPages: true,
    loading: false,
    nextLoading: false,
    refreshing: false,
  };

  async componentDidMount() {
    this.setState({loading: true});
    const {
      route: {
        params: {user},
      },
      navigation,
    } = this.props;

    navigation.setOptions({
      title: user.name,
    });

    const list = await this.loadStarred();
    this.setState({loading: false, stars: list});
  }

  handleLoadMore = async () => {
    const {otherPages, page, stars} = this.state;
    this.setState({nextLoading: true});
    if (otherPages) {
      const list = await this.loadStarred(page + 1);
      if (list) {
        this.setState({
          stars: [...stars, ...list],
          page: page + 1,
        });
      }
    }
    this.setState({nextLoading: false});
  };

  loadStarred = async (pageNumber = 1) => {
    const {otherPages} = this.state;

    if (otherPages) {
      const {
        route: {
          params: {user},
        },
      } = this.props;
      const response = await api.get(`/users/${user.login}/starred`, {
        params: {
          page: pageNumber,
        },
      });

      if (response.data.length > 0) {
        return response.data;
      }
    }
    this.setState({otherPages: false});
    return false;
  };

  refreshList = async () => {
    const list = await this.loadStarred(1);
    if (list) {
      this.setState({
        stars: [...list],
        page: 1,
      });
    }
  };

  handleShowRepo = repo => {
    const {navigation} = this.props;

    navigation.navigate('RepoStarred', {repo});
  };

  render() {
    const {route} = this.props;
    const {stars, loading, nextLoading, refreshing} = this.state;
    const {user} = route.params;
    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Stars
            onEndReachedThreshold={0.2}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReached={this.handleLoadMore}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({item}) => (
              <Starred>
                <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                <Info
                  onStartShouldSetResponder={() => {
                    this.handleShowRepo(item);
                  }}>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
        {nextLoading && <ActivityIndicator />}
      </Container>
    );
  }
}
