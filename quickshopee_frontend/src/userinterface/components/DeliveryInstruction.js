import { Button } from "@mui/material";
import React from "react";

export default function DeliveryInstruction(){
    return(
        <div style={{display:'flex'}}>
       <div>Delivery instructions</div>
        <div>Delivery partner will be notified</div>
        <div>
            <Button>
                <img src="delivery.avif"/>
                <div>
                    <div>Return PET Bottles</div>
                    <div>Help us recycle plastic bottles by returning them to our delivery partner</div>
                    <div>
                        <p>An Initiative by</p>
                        <img/>
                    </div>
                </div>
            </Button>

        </div>
        </div>
    )
}