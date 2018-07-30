import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const PlayerSelector = (props) => {
  return (
    <FormControl style={{width: '50%', minWidth: '50%'}}>
      <Select
        value={props.selectedPlayer._id || ''}
        displayEmpty
        name="player"
        onChange={(event) => props.onPlayerChanged(event.target.value)}
      >
        <MenuItem value='' disabled>
          <em>
            {props.label}
          </em>
        </MenuItem>
        {props.players && props.players.map(player =>
          <MenuItem key={player._id} value={player._id}>{player.name}</MenuItem>
        )}
      </Select>
      <img onClick={props.openSelect} style={{width: '100px', marginTop: '10px'}} src={props.selectedPlayer.avatarUrl} />
    </FormControl>
  )
}

export default PlayerSelector
