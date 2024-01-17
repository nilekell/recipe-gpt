'use client';
import React, { useEffect } from "react";

const Modal = (props: any) => {
    const closeOnEscapeKeyDown = (e : any) => {
        if ((e.charCode || e.keyCode) === 27) {
            props.onClose()
        }
    }

    useEffect(() => {
        console.log(props)
        document.body.addEventListener('keydown', closeOnEscapeKeyDown)
        return function cleanup() {
            document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
        }
    })

    return (
        <div className={`modal ${props.show ? 'show' : ''}`}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{props.title}</h4>
                </div>
                <div className="modal-body">
                    {props.message}
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="modal-button">Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal