import { Button , Paper} from "@mui/material";



export default function DeliveryPartnerTip(){
    return(
            <div >
                <Paper style={{width:'auto',borderRadius:'10px',marginLeft:'20%',marginRight:'15%',marginTop:'2%'}} >
                    <div style={{paddingLeft: '1.25rem',paddingTop: '1.5rem' , paddingBottom: '1.5rem'}}>
                    <p style={{fontSize: '1rem!important', lineHeight: '1.5rem!important',fontFamily: 'Lato'}}>Delivery Partner Tip</p>
                    <p>The entire amount will be sent to your delivery partner</p>
                    <div>
                        <Button>
                            <img src="https://www.zeptonow.com/_next/image?url=%2Fimages%2Fcart%2Frider-tip%2F1000.png&w=3840&q=75"></img>
                            <p>&#8377;10</p>
                        </Button>
                        <Button>
                            <img src="https://www.zeptonow.com/_next/image?url=%2Fimages%2Fcart%2Frider-tip%2F2000.png&w=3840&q=75"></img>
                            <p>&#8377;20</p>
                        </Button>
                        <Button>
                            <img src="https://www.zeptonow.com/_next/image?url=%2Fimages%2Fcart%2Frider-tip%2F3500.png&w=3840&q=75"></img>
                            <p>&#8377;35</p>
                        </Button>
                        <Button>
                        <img src="https://www.zeptonow.com/_next/image?url=%2Fimages%2Fcart%2Frider-tip%2F5000.png&w=3840&q=75"/>
                        <p>&#8377;50</p>
                        </Button>
                    </div>
                   </div>
                </Paper>
            </div>
    )
}