import {useEffect, useState} from "react";
import axios from "axios";
import ChannelsComponent from "./channels";


const HomeComponent = () => {
    return (
        <div>
            <div style={{display:"flex"}}>
                <ChannelsComponent/>
            </div>
        </div>

    )
}

export default HomeComponent;