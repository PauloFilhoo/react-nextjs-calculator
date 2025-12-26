import { Button } from "./Button.component";
import { Keyboard } from "./Keyboard.component";
import { Display } from "./Display.component";

export default function Calculator()
{
    return (
        <div className="ctn">
            <nav className="tabs">
                <h1>Calculator</h1>
                <ul className="flex flex-row gap-4">
                    <li>-</li>
                    <li>X</li>
                </ul>
            </nav>
            <Keyboard />
        </div>
    );
}