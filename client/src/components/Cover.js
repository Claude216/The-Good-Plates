import React from 'react';
import './css/Home.css';
import cover2 from "../images/cover2.jpg";

function Cover() {
    return(
        <div className='cover'>
            {/* there are 3 sections on the cover page:
                1. upper bond
                2. title, eclipse and title message
                3. lower bond
                */}

            {/* upper bond 
            <section className="main-container">
                <div>
                    <section className="bond1">
                    </section>
                </div>
            </section>*/}
            {/* middle bond*/}
            <section className="main1">
                <div>
                    <br/><br/><br/>
                    {/**title */}
                    <section className="bond1">
                        <div className="title">
                            The Good Plates
                        </div>
                    </section>   
                </div>
                {/**eclipse */}
                <div className="cover_BG">
                    <img alt="" className="cover_BG" src = {cover2} />
                </div> 
                {/**title message*/}
                <section className="bond2">
                    <div className="cover_text">
                        Your ideal restaurant is on the way!  
                    </div>
                </section>
               
                
            </section>
            {/* lower bond
            <section className='main2'>
            </section>*/}
        </div>
    );
}

export default Cover
