export function Display(props: { value: string, operation?: string })
{
    return (
        <div className="display ">
            {props.value}{props.operation && ` ${props.operation}`}
        </div>
    );
}