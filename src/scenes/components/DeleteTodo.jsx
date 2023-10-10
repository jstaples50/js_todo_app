import React from "react";
import { Typography, IconButton, Popover } from "@mui/material";
import { red } from "@mui/material/colors";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

function DeleteTodo({ handleTodoDelete }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        onClick={handleTodoDelete}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ "&:hover": { color: red[500], bgcolor: red[50] } }}
      >
        <HighlightOffOutlinedIcon />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Delete Todo</Typography>
      </Popover>
    </div>
  );
}

export default DeleteTodo;
