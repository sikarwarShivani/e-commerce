import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { postData } from "../../../NodeServices/FetchNodeServices";
import AddressPopUp from "./AddressPopUp";

export default function OtpPopUp(props) {
  const [status, setStatus] = useState(false);
  const [inputOtp, setInputOtp] = useState("");
  const [Dopen, setDopen] = useState(props.status);
  const [handleDialog, setHandleDialog] = useState(true);

  const handleClick = async () => {
    if (props.otp == inputOtp) {
      var mobilenostatus = await postData("userinterface/check_mobile_no", {
        mobileno: props.mobileno,
      });
      if (mobilenostatus.status) {
        var addressstatus = await postData(
          "userinterface/check_address_by_mobile_no",
          { mobileno: props.mobileno }
        );
        if (addressstatus.status) {
          setDopen(false);
          setStatus(false);
          props.setStatus(false);
          setHandleDialog(false); 
          props.setBtnTitle('Proceed to payment')
          alert(props.setBtnTitle)
          alert("Proceed to payment")
        } else {
          setStatus(true); 

        }
      }
      else {
        setStatus(true);
      }
    } else {
      alert("Invalid Otp");
    }
  };

  useEffect(
    function () {
      setDopen(props.status);
    },
    [props] 
  );

  const checkOtp = (event) => {
    var inputOtp = "";
    if (document.getElementById("first").value.length == 1) {
      document.getElementById("second").focus();
      inputOtp += document.getElementById("first").value;
    }
    if (document.getElementById("second").value.length == 1) {
      document.getElementById("third").focus();
      inputOtp += document.getElementById("second").value;
    }
    if (document.getElementById("third").value.length == 1) {
      document.getElementById("fourth").focus();
      inputOtp += document.getElementById("third").value;
    }
    if (document.getElementById("fourth").value.length == 1) {
      inputOtp += document.getElementById("fourth").value;
      setInputOtp(inputOtp);
    }
  };

  return (
    <div>
      <Dialog
        open={Dopen}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            color: "blue",
            padding: 5,
          }}
        >
          Back
        </div>
        <DialogTitle
          style={{
            color: "grey",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
          }}
        >
          Phone Number Verification
        </DialogTitle>
        <DialogContent style={{ background: "#e6e6f0" }}>
          <DialogContentText
            style={{
              display: "flex",
              marginTop: "7%",
              justifyContent: "center ",
              fontFamily: "Poppins",
              fontWeight: 600,
            }}
          >
            Enter 4 digit code sent to your phone
            {`+91XXXXXX${props.mobileno.substring(6)}`}
          </DialogContentText>
          <div
            style={{
              display: "flex",
              marginTop: "4%",
              marginLeft: "15%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="first"
              onChange={(event) => checkOtp(event)}
              style={{ width: "15%", marginRight: "5%" }}
            ></TextField>
            <TextField
              id="second"
              onChange={(event) => checkOtp(event)}
              style={{ width: "15%", marginRight: "5%" }}
            ></TextField>
            <TextField
              id="third"
              onChange={(event) => checkOtp(event)}
              style={{ width: "15%", marginRight: "5%" }}
            ></TextField>
            <TextField
              id="fourth"
              onChange={(event) => checkOtp(event)}
              style={{ width: "15%", marginRight: "5%" }}
            ></TextField>
          </div>
          <div style={{ marginTop: "3%" }}>
            <Button
              variant="contained"
              color="secondary"
              style={{
                width: "60%",
                marginLeft: "17%",
                marginBottom: 15,
                marginTop: 10,
              }}
              onClick={handleClick}
            >
              Next
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "grey",
              fontWeight: "auto",
              marginTop: "2%",
            }}
          >
            By continuing you agree to our
          </div>
        </DialogContent>
      </Dialog>
      <AddressPopUp mobileno={props.mobileno} status={status}  />
    </div>
  );
}
