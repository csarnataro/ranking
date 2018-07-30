import React from 'react'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import Autocomplete from 'react-autocomplete'

import Layout from '../../components/Layout.js'
import TeamBuilder from '../../components/TeamBuilder'
import withTitle from '../../lib/hoc/withTitle'
import { getUsersList} from '../../lib/api/users'
import { addNewMatch } from '../../lib/api/match'
import { styleH1, styleForm, styleTextField, styleRaisedButton } from '../../lib/SharedStyles'

class AddMatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        search: '',
        players: [],
        matchAdded: false,
        teamHome: {
            defender: {
              avatarUrl: 'https://www.shareicon.net/data/128x128/2016/06/30/788946_people_512x512.png',
              name: ''
            },
            striker: {
              avatarUrl: 'https://www.shareicon.net/data/128x128/2016/06/30/788946_people_512x512.png',
              name: ''
            },
            score: [0, 0]
        },
        teamAway: {
            defender: {
                avatarUrl: 'https://www.shareicon.net/data/128x128/2016/06/30/788946_people_512x512.png',
                name: ''
            },
            striker: {
                avatarUrl: 'https://www.shareicon.net/data/128x128/2016/06/30/788946_people_512x512.png',
                name: ''
            },
            score: [0, 0]
        },
        badges: []
    }
  }

  async componentDidMount() {
    try {
      const players = await getUsersList()
      this.setState({ players: players })
    } catch (err) {
      console.log(err)
    }
  }

  handleScoreChange = name => event => {
    const teamObj = Object.assign({}, this.state[name], {score: event.target.value} )
    this.setState({
      [name]: teamObj
    })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const match = await addNewMatch({
      teamHome: this.state.teamHome,
      teamAway: this.state.teamAway,
      badges: []
    })

    this.setState({ matchAdded: true })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  updateTeam = (teamId) => (role, playerId) => {
    const player = this.state.players.find(p => p._id == playerId)
    console.log('************ BEGIN: new ************')
    console.dir(role, {colors: true, depth: 16})
    console.dir(player, {colors: true, depth: 16})
    console.log('************ END:   new ************')

    if (teamId === 'home') {
      this.setState({
        teamHome: Object.assign({}, this.state.teamHome, { [role]:
          {
            _id: player._id,
            name: player.name,
            avatarUrl: player.avatarUrl
          }
        })
      })
    } else {
      this.setState({
        teamAway: Object.assign({}, this.state.teamAway, { [role]:
          {
            _id: player._id,
            name: player.name,
            avatarUrl: player.avatarUrl
          }
        })
      })
    }
  }

  render() {

    return (
      <Layout>
        <h1 style={styleH1}>Add new match</h1>
        <Divider />
        <form
          autoComplete="off"
          style={styleForm}
          onSubmit={this.onSubmit}
        >

        <TeamBuilder
          label='Team Home'
          teamId='home'
          players={this.state.players}
          currentTeam={this.state.teamHome}
          onTeamUpdated={this.updateTeam('home')}/>

        <TeamBuilder
          label='Team Away'
          teamId='away'
          players={this.state.players}
          currentTeam={this.state.teamAway}
          onTeamUpdated={this.updateTeam('away')}/>

        <hr style={{marginTop:'50px'}}/>
        <hr />
        {/* <div id="teamHome">
            <h2>Team Home</h2>


            <div id="teamHomeDefender">
                <h3>Defender</h3>
                <img src={this.state.teamHome.defender.avatarUrl} alt={this.state.teamHome.defender.name} />
                <p>{this.state.teamHome.defender.name}</p>
                <Autocomplete
                    getItemValue={(player) => player.name}
                    value={this.state.search}
                    items={this.state.players.filter((item) => item.name !== this.state.teamHome.defender.name)}
                    onSelect={(value, item) => {
                        const defender = Object.assign({}, this.state.teamHome, {defender: item} )
                        this.setState({ teamHome: defender})
                    }}
                    onChange={(event, value) => {
                        //if(this.state.search.length)
                        console.log(value)
                        //this.setState({ value })
                        //clearTimeout(this.requestTimer)
                        //this.requestTimer = fakeRequest(value, (items) => {
                        //this.setState({ unitedStates: items })
                        //})
                    }}
                    renderItem={(item, isHighlighted) => (
                        <div
                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                        key={item.abbr}
                        >
                            <p>{item.name}</p>
                        </div>
                    )}
                />
            </div>
            <div id="teamHomeStriker">
                <h3>Striker</h3>
                <img src={this.state.teamHome.striker.avatarUrl} alt={this.state.teamHome.striker.name} />
                <p>{this.state.teamHome.striker.name}</p>
                <Autocomplete
                    getItemValue={(player) => player.name}
                    value={this.state.search}
                    items={this.state.players.filter((item) => item.name !== this.state.teamHome.striker.name)}
                    onSelect={(value, item) => {
                        const striker = Object.assign({}, this.state.teamHome, {striker: item} )
                        this.setState({ teamHome: striker})
                    }}
                    onChange={(event, value) => {
                        //if(this.state.search.length)
                        console.log(value)
                        //this.setState({ value })
                        //clearTimeout(this.requestTimer)
                        //this.requestTimer = fakeRequest(value, (items) => {
                        //this.setState({ unitedStates: items })
                        //})
                    }}
                    renderItem={(item, isHighlighted) => (
                        <div
                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                        key={item.abbr}
                        >
                            <p>{item.name}</p>
                        </div>
                    )}
                />
            </div>
            <TextField
                style={styleTextField}
                id="teamHomeScore"
                label="Score"
                value={this.state.teamHome.score}
                onChange={this.handleScoreChange('teamHome')}
                margin="normal"
                required
            />
        </div>
        <div id="teamAway">
            <h2>Team Away</h2>
            <div id="teamAwayDefender">
                <h3>Defender</h3>
                <img src={this.state.teamAway.defender.avatarUrl} alt={this.state.teamAway.defender.name} />
                <p>{this.state.teamAway.defender.name}</p>
                <Autocomplete
                    getItemValue={(player) => player.name}
                    value={this.state.search}
                    items={this.state.players.filter((item) => item.name !== this.state.teamAway.defender.name)}
                    onSelect={(value, item) => {
                        const defender = Object.assign({}, this.state.teamAway, {defender: item} )
                        this.setState({ teamAway: defender})
                    }}
                    onChange={(event, value) => {
                        //if(this.state.search.length)
                        console.log(value)
                        //this.setState({ value })
                        //clearTimeout(this.requestTimer)
                        //this.requestTimer = fakeRequest(value, (items) => {
                        //this.setState({ unitedStates: items })
                        //})
                    }}
                    renderItem={(item, isHighlighted) => (
                        <div
                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                        key={item.abbr}
                        >
                            <p>{item.name}</p>
                        </div>
                    )}
                />
            </div>
            <div id="teamAwayStriker">
                <h3>Striker</h3>
                <img src={this.state.teamAway.striker.avatarUrl} alt={this.state.teamAway.striker.name} />
                <p>{this.state.teamAway.striker.name}</p>
                <Autocomplete
                    getItemValue={(player) => player.name}
                    value={this.state.search}
                    items={this.state.players.filter((item) => item.name !== this.state.teamAway.striker.name)}
                    onSelect={(value, item) => {
                        const striker = Object.assign({}, this.state.teamAway, {striker: item} )
                        this.setState({ teamAway: striker})
                    }}
                    onChange={(event, value) => {
                        //if(this.state.search.length)
                        console.log(value)
                        //this.setState({ value })
                        //clearTimeout(this.requestTimer)
                        //this.requestTimer = fakeRequest(value, (items) => {
                        //this.setState({ unitedStates: items })
                        //})
                    }}
                    renderItem={(item, isHighlighted) => (
                        <div
                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                        key={item.abbr}
                        >
                            <p>{item.name}</p>
                        </div>
                    )}
                />
            </div>
            <TextField
                style={styleTextField}
                id="teamAwayScore"
                label="Score"
                value={this.state.teamAway.score}
                onChange={this.handleScoreChange('teamAway')}
                margin="normal"
                required
            />
        </div> */}

          <Button
            variant="contained"
            style={styleRaisedButton}
            type="submit"
          >
            Add Match
          </Button>
        </form>
      </Layout>
    )
  }
}

export default withTitle('New Match')(AddMatch)
