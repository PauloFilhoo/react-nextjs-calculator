export function Display(props: { value: string, operation?: string, compact?: any })
{
    return (
        <div className={`display ${props.compact? "display-compact" : "display"}`} >
            {props.value}{props.operation && ` ${props.operation}`}
        </div>
    );
}