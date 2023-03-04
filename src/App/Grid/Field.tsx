import React from "react";

export type FieldValue = "" | "X" | "O"

interface FieldProps {
    index: number,
    value: FieldValue,
    onClick: (f: Field) => void
}

interface FieldState {
}

export class Field extends React.Component<FieldProps, FieldState> {
    state: FieldState = {}

    render() {
        return (
            <div className={"field field-" + this.props.value.toLowerCase()} id={"" + this.props.index} onClick={() => this.props.onClick(this)}>
                {this.props.value}
            </div>
        );
    }
}

