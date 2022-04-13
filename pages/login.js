import React from 'react'
import Login from '../src/component/Login'

import { withPublic } from '../src/hooks/route';

function HomeLogin(props) {
  return (
    <div>
      <Login auth={props.auth}/>
    </div>
  )
}

export default withPublic(HomeLogin);
