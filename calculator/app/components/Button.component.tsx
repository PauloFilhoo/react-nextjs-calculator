"use client";

export function Button(props: any) {
    return (
        <button 
        onClick={e => props.click && props.click(props.label)}
        className={`btn 
        ${props.double ? 'btn-double' : ''} 
        ${props.operation ? 'btn-operation' : ''}`}
        >
            {props.label}
        </button>
    );
}