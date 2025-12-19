export function Display(props: { value: string })
{
    return (
        <div className="display ">
            {props.value || "0"}
        </div>
    );
}