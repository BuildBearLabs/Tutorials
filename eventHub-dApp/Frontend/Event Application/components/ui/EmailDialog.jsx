import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from './Input';

export default function AlertDialog({open, setOpen, email, setEmail, name, setName, eventHeading, registerForEvent}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Please Enter your Email Address to Register for ${eventHeading} Event.`}
        </DialogTitle>
        <DialogContent>
          <Input onChange={(e)=>{setEmail(e.target.value)}} style={{border: "1px solid #aaa"}} type="email" placeholder="Email Address" value={email}/>
          <Input className="mt-3" style={{border: "1px solid #aaa"}} onChange={(e)=>{setName(e.target.value)}} type="name" placeholder="Name" value={name}/>
        </DialogContent>
        <DialogActions>
          <Button style={{padding: "4px 10px", backgroundColor: "rgba(0, 0, 100, 0.8)", color: "#fff"}} onClick={handleClose}>Close</Button>
          <Button disabled={!email.includes('@') || name.length<2} style={{padding: "4px 10px", backgroundColor: `${(email.includes('@') && name.length>2) ? "rgba(0, 0, 100, 0.8)": "rgba(0, 0, 100, 0.5)"}`, color: "#fff"}} onClick={() => {
            handleClose();
            registerForEvent();
          }} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}