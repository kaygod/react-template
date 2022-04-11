import React,{useEffect} from 'react';
import { Wrapper } from "./style.js"; 

interface locationType {
    search:string
}

interface defaultProps {
  location:locationType
}

export const globalRef:{value:any} = {
    value:null
}


const HomePage = (props:defaultProps) => {
        return (
            <Wrapper>
              <div className="client-manage">
                Hello world
              </div>
            </Wrapper>
        );
};


export default HomePage;