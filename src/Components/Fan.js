import React, { useState } from "react";
import { Switch } from "@mui/material";
import { Add, Remove } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useWebSocket } from "../Context/WebSocketContext";


function Fan(props) {

    const {sendMessage} = useWebSocket();
    const [isOn, setIsOn] = useState(false);
    const [fanSpeed] = useState(1);

    const handleSwitch = (e) => {
        const state = e.target.checked;
        setIsOn(state);
        sendMessage(JSON.stringify({
            type: "FAN_CONTROL",
            deviceid: props.id,
        }));
    };

    return (
        <div className="col-12 col-sm-6 col-md-3 mb-3 d-flex align-items-stretch">
            <div className="card border h-100 w-100">
                <div className="card-body">
                    <h6 className="card-title" style={{ fontSize: '1.25rem' }}>{props.name}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0" style={{ fontSize: '1.1rem' }}>Power</p>
                        <Switch checked={isOn} onClick={handleSwitch}/>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 me-2">Speed:</p>
                        <div>
                            <IconButton size="small">
                                <Remove />
                            </IconButton>
                            <span className="mx-1">{fanSpeed}</span>
                            <IconButton size="small">
                                <Add />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Fan;
