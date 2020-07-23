import React from "react";
import Classes from "../Style/cards.module.css";
import blub from "../Assets/blub.png";
import mark from "../Assets/mark.png";
import clock from "../Assets/clock.png";
import underperfrom from "../Assets/underperform.png";


class Cards extends React.Component{
    render(){
        return (
            <div className={Classes.cardGrid}>
                <div className={Classes.card}>
                    <img src={blub} alt="insights"/>
                    <div>
                        <h2 className={Classes.heading}>62</h2>
                        <p className={Classes.info}>Jobs Completed</p>
                    </div>
                </div>

                <div className={Classes.card}>
                    <img src={mark} alt="mark"/>
                    <div>
                        <h2 className={Classes.heading}>6.8</h2>
                        <p className={Classes.info}>Efficiency</p>
                    </div>
                </div>

                <div className={Classes.card}>
                    <img src={underperfrom} alt="underperfrom"/>
                    <div>
                        <h2 className={Classes.heading}>9 <span className={Classes.info}>(14%)</span></h2>
                        <p className={Classes.info}>Jobs Queued</p>
                    </div>
                </div>

                <div className={Classes.card}>
                    <img src={clock} alt="clock"/>
                    <div>
                        <h2 className={Classes.heading}>2h 43m</h2>
                        <p className={Classes.info}>Time Left</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards;