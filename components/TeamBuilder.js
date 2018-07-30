import React from 'react'
import PlayerSelector from './PlayerSelector';

const TeamBuilder = (props) => (
  <div>
    <h2>{props.label}</h2>
    <PlayerSelector
      role="defender"
      label="Defender"
      selectedPlayer={props.currentTeam.defender}
      onPlayerChanged={(playerId) => props.onTeamUpdated('defender', playerId)}
      players={props.players}
    />

    <PlayerSelector
      role="striker"
      label="Striker"
      selectedPlayer={props.currentTeam.striker}
      onPlayerChanged={(playerId) => props.onTeamUpdated('striker', playerId)}
      players={props.players}
    />
  </div>
)

export default TeamBuilder
