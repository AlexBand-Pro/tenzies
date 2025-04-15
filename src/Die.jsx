import { GiInvertedDice1 } from "react-icons/gi";
import { GiInvertedDice2 } from "react-icons/gi";
import { GiInvertedDice3 } from "react-icons/gi";
import { GiInvertedDice4 } from "react-icons/gi";
import { GiInvertedDice5 } from "react-icons/gi";
import { GiInvertedDice6 } from "react-icons/gi";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    const borderStyles = {
        border: props.isHeld ? "4px solid #59E391" : "4px solid white"
    }
    
    const diceIcons = {
        1: <GiInvertedDice1 size={100} />,
        2: <GiInvertedDice2 size={100} />,
        3: <GiInvertedDice3 size={100} />,
        4: <GiInvertedDice4 size={100} />,
        5: <GiInvertedDice5 size={100} />,
        6: <GiInvertedDice6 size={100} />
    }
    
    return (
        <button 
            style={styles}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
        >{diceIcons[props.value]}<div style={borderStyles} className="border-remover"></div></button>
    )
}