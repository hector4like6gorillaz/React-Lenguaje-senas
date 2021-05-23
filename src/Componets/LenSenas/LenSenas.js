import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { LenImgText } from '../LenImgText/LenImgText';
import { LenKeyboard } from '../LenKeyborar/LenKeyboard';
import {
    DivKeyboard,
    TextIn,
    DivIn,
    DivText,
    DivCent,
    HH,
    DivInputX,
    ButtonErase,
    HideKeyboard,

} from './lensenasStyled';
export const LenSenas = () => {
    document.title = "Señas Keyboard";
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [areaKeyboard, setareaKeyboard] = useState({ x: "", y: "" });

    const [hide, setHide] = useState(false);
    const [bottomBolean, setBottomBolean] = useState(false);
    const [xmayory, setXmayory] = useState(true);

    useEffect(() => {
        setLoading(false);
        keyboardsize();
        setLoading(true);
    }, []);
    const keyboardsize = () => {
        var x = window.screen.width;
        var y = window.screen.height;
        setareaKeyboard({ x: `${x * .9}`, y: `${(x < y) ? y * .3 : y * .6}` });
        (x < y) ? setXmayory(true) : setXmayory(false);
    }
    const hideKeyboard = () => {
        (!hide) ? setareaKeyboard({ x: `0`, y: `0` }) : keyboardsize();
        (hide) ? setHide(false) : setHide(true);
        (bottomBolean) ? setBottomBolean(false) : setBottomBolean(true);
    }
    window.addEventListener("resize", function () {
        keyboardsize();
    });


    return (
        <DivCent >
            <HideKeyboard onClick={hideKeyboard}>
                <FontAwesomeIcon size="1x" icon={faKeyboard} />
            </HideKeyboard>
            <HH>Traductor de señas bidireccional</HH>
            <DivIn>
                <DivInputX>
                    <TextIn
                        onChange={(event) => {
                            setText(event.target.value);
                        }}
                        placeholder="escribe texto"
                        value={text}
                    />
                    <ButtonErase onClick={() => setText("")}>
                        <FontAwesomeIcon size="3x" icon={faTimesCircle} />
                    </ButtonErase>
                </DivInputX>
            </DivIn>
            <DivText heigth={(xmayory) ? areaKeyboard.y * 1.2 : areaKeyboard.y * .55}>
                <LenImgText sentence={text} hei={(xmayory) ? areaKeyboard.y * 1.2 : areaKeyboard.y * .55} />
            </DivText>
            <DivKeyboard area={areaKeyboard} over={bottomBolean} >
                {loading && <LenKeyboard area={areaKeyboard} func={setText} val={text} />}
            </DivKeyboard>
        </DivCent>
    )
}

