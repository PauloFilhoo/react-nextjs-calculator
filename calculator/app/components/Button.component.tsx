"use client";

import Image from "next/image";

export function Button(props: any) {
    return (
        <button
            onClick={e => props.click && props.click(props.label)}
            className={`btn 
        ${props.double ? 'btn-double' : ''} 
        ${props.operation ? 'btn-operation' : ''}`}
        >
            {props.opsymbol ? <Image src={props.opsymbol} alt={props.label} width={24} height={24} /> : props.label}
        </button>
    );
}