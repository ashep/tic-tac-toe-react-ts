import React from "react"
import { Field, FieldValue } from "./Field"
import './index.css'

interface GridProps { };

interface GridState {
    values: FieldValue[]
};


export default class Grid extends React.Component<GridProps, GridState> {
    gameOver: boolean = false
    infoMsg: string = ""
    turnNum: number = 0
    state: GridState = {
        values: Array<FieldValue>()
    }

    constructor(props: GridProps) {
        super(props)
        this.state = this.reset()
    }

    onFieldClick = (f: Field) => {
        if (this.gameOver) {
            this.setState(this.reset())
            return
        }

        const i = f.props.index
        const v = this.state.values

        if (v[i] !== "") {
            return
        }

        this.infoMsg = `Next turn is: ${this.turnNum % 2 ? "X" : "O"}`

        v[f.props.index] = this.turnNum % 2 ? "O" : "X"
        this.setState({ values: v })

        this.turnNum++

        const res = this.checkResult()
        if (res !== "") {
            this.infoMsg = `${res} won!`
            this.gameOver = true
        } else if (this.turnNum > 8) {
            this.infoMsg = "Game over"
            this.gameOver = true
        }
    }

    reset = (): GridState => {
        this.infoMsg = `Next turn is: X`
        this.turnNum = 0
        this.gameOver = false;
        return { values: ["", "", "", "", "", "", "", "", ""] }
    }

    checkResult(): FieldValue {
        const v = this.state.values

        const winCases: number[][] = [
            // Horizontals
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            // Verticals
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            // Diagonals
            [0, 4, 8],
            [2, 4, 6],
        ]

        let res: FieldValue = ""
        Array<FieldValue>("X", "O").forEach(s => {
            if (res !== "") {
                return
            }

            for (let caseN = 0; caseN < winCases.length; caseN++) {
                const caseV = winCases[caseN]
                if (v[caseV[0]] === s && v[caseV[1]] === s && v[caseV[2]] === s) {
                    res = s
                }
            }
        })

        return res
    }

    render(): JSX.Element {
        return (
            <div className="grid">
                <div className="info">{this.infoMsg}</div>
                <div className="row">
                    <Field index={0} value={this.state.values[0]} onClick={this.onFieldClick} />
                    <Field index={1} value={this.state.values[1]} onClick={this.onFieldClick} />
                    <Field index={2} value={this.state.values[2]} onClick={this.onFieldClick} />
                </div>
                <div className="row">
                    <Field index={3} value={this.state.values[3]} onClick={this.onFieldClick} />
                    <Field index={4} value={this.state.values[4]} onClick={this.onFieldClick} />
                    <Field index={5} value={this.state.values[5]} onClick={this.onFieldClick} />
                </div>
                <div className="row">
                    <Field index={6} value={this.state.values[6]} onClick={this.onFieldClick} />
                    <Field index={7} value={this.state.values[7]} onClick={this.onFieldClick} />
                    <Field index={8} value={this.state.values[8]} onClick={this.onFieldClick} />
                </div>
            </div>
        )
    }
}
