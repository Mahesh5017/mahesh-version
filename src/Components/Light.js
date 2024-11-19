import React, { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import { useWebSocket } from "../Context/WebSocketContext";

function Light(props) {
    const [isOn, setIsOn] = useState(false);
    const { messages, sendMessage } = useWebSocket();

    useEffect(() => {
        if (messages) {
            if (messages.type === "DEVICE_STATUS" && messages.deviceid === props.id) {
                setIsOn(messages.status);
            }
        }
    }, [messages, props.id]);

    const handleSwitch = (e) => {
        const state = e.target.checked;
        setIsOn(state);
        sendMessage(JSON.stringify({
            type: "LIGHT_CONTROL",
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
                        <Switch checked={isOn} onChange={handleSwitch} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Light;