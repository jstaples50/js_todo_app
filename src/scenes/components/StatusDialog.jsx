import { Dialog, DialogTitle, ButtonGroup, Button } from "@mui/material";

const StatusDialog = ({
  open,
  setOpen,
  handleStatusChangeClick,
  handleAddPriorityClick,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Set Current Status</DialogTitle>
      <ButtonGroup>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          data-status="1"
          onClick={handleStatusChangeClick}
        >
          Not Started
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="warning"
          data-status="0"
          onClick={handleStatusChangeClick}
        >
          In Progress
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="success"
          data-status="2"
          onClick={handleStatusChangeClick}
        >
          Done!
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          data-status="2"
          onClick={handleAddPriorityClick}
        >
          Make High Priority
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};

export default StatusDialog;
