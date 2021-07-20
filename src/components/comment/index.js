import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
const Comment = () => {
  return (
    <Grid container wrap="nowrap" spacing={2} style={{ margin: "0.5rem 0" }}>
      <Grid item>
        <Avatar>W</Avatar>
      </Grid>
      <Grid item xs>
        <Typography>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and
          set aside for 10 minutes.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Comment;