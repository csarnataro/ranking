import Layout from '../../components/Layout.js'
import { getMatchesList } from '../../lib/api/match'
import { styleLoadMoreButton,styleMatchInfo,styleMatchScore,styleMatchTile,stylePlayerScore,styleTeamTile,styleTeamPlayer } from '../../lib/ListOfMatches.js'
import { withStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

const elementPerPage = 3

const styles = {
  chipsLabel: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}
class IndexMatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadMoreActive: true,
      matches: []
    }
    this.loadMore = this.loadMore.bind(this);
  }

  async componentDidMount () {
    try {
      if(this.state.matches.length <= 0){
        const data = await getMatchesList(0, elementPerPage)
        this.setState({ matches: data })
      }
    } catch (err) {
      console.log(err)
    }
  }

  loadMore () {
    if(this.state.loadMoreActive === true) {
      this.setState({ loadMoreActive: false })
      try {
        getMatchesList(this.state.matches.length, elementPerPage).then((newMatches) => {
          const matches = this.state.matches.concat(newMatches)
          this.setState({loadMoreActive: (matches.length > this.state.matches.length + elementPerPage), matches: matches })
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  convertDate (inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
  }

  render () {
    return <Layout>
    <p>Played matches</p>
    <GridList style={{margin: '0 auto', maxWidth: '500px', minWidth: '400px'}}>
      {this.state.matches && this.state.matches.map(match => (
        <GridListTile style={styleMatchTile} key={match.slug}>
          <GridList>
            <GridListTile style={styleTeamTile('right')}>
              <Chip
                avatar={<Avatar src={match.teamHome.defender.avatarUrl} />}
                label={match.teamHome.defender.name}
                style={styleTeamPlayer('right')}
              />
              <Chip
                avatar={<Avatar src={match.teamHome.striker.avatarUrl} />}
                label={match.teamHome.striker.name}
                style={styleTeamPlayer('right')}
              />
            </GridListTile>
            <GridListTile style={styleMatchScore}>
              <Button variant="fab" mini color="primary">
                {match.teamHome.score} - {match.teamAway.score}
              </Button>
              <Badge color="secondary" badgeContent={<small>dh</small>} style={stylePlayerScore('defender','home')}> </Badge>
              <Badge color="secondary" badgeContent={<small>sh</small>} style={stylePlayerScore('striker','home')}> </Badge>
              <Badge color="secondary" badgeContent={<small>da</small>} style={stylePlayerScore('defender','away')}> </Badge>
              <Badge color="secondary" badgeContent={<small>sa</small>} style={stylePlayerScore('striker','away')}> </Badge>
            </GridListTile>
            <GridListTile style={styleTeamTile('left')}>
              <Chip
                avatar={<Avatar src={match.teamAway.defender.avatarUrl} />}
                classes={{label: this.props.classes.chipsLabel}}
                label={match.teamAway.defender.name}
                style={styleTeamPlayer('left')}
              />
              <Chip
                avatar={<Avatar src={match.teamAway.striker.avatarUrl} />}
                label={match.teamAway.striker.name}
                style={styleTeamPlayer('left')}
              />
            </GridListTile>
          </GridList>
          <GridListTileBar
            style={styleMatchInfo}
            title={this.convertDate(match.createdAt)}
          >
          </GridListTileBar>
        </GridListTile>
      ))}
    </GridList>
    <Button
        color="primary"
        disabled={!this.state.loadMoreActive}
        onClick={this.loadMore}
        style={styleLoadMoreButton(this.state.loadMoreActive)}
        type="button"
        variant="contained"
      >
        Load more
      </Button>
  </Layout>
  }
}

export default withStyles(styles)(IndexMatch)