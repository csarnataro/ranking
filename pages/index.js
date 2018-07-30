import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import Layout from '../components/Layout.js'

import {
  styleH1,
} from '../lib/SharedStyles'

export default () => (
  <Layout>
    <div style={{ padding: '10px 8%', fontSize: '15px' }}>
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={12} xs={12} style={{ textAlign: 'center' }}>
          <br />
          <h1 style={styleH1}>RunKing</h1>
        </Grid>
      </Grid>
    </div>
  </Layout>
)
