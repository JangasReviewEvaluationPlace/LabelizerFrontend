import React from 'react';

import { FetchAuth } from '../../api/fetch';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Authentication() {
  const [authData, setAuthData] = React.useState({email: "", password: ""})

  const handleUpdate = (e) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value
    })
  }

  const authSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await FetchAuth.postAuthentication(authData.email, authData.password);
      window.location.reload();
    }
    catch (err) {
      setAuthData({email: "", password: ""})
    }
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form noValidate onSubmit={authSubmitHandler}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={authData.email}
          onChange={handleUpdate}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={authData.password}
          onChange={handleUpdate}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </form>
    </>
  )
}
