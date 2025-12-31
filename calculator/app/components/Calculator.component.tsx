import { Keyboard } from "./Keyboard.component";
import { Display } from "./Display.component";

export default function Calculator()
{
    return (
        <div className="ctn">
            <nav className="tabs">
                <h1>Calculator</h1>
            </nav>
            <Keyboard />
        </div>
    );
}