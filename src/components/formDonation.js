import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import "./style.css"

function FormDonation(props) {

    const [flagName, setFlagName] = useState(false);
    const [flagNum, setFlagNum] = useState(false);
    const [flagTarget, setFlagTarget] = useState(false);
    const [flagConversionRate, setFlagConversionRate] = useState(false);
    const [flagEntityType, setFlagEntityType] = useState(false);
    const [flagCurrencyType, setFlagCurrencyType] = useState(false);
    const [hasError, setHasError] = useState(true);
    const [conversionRateMass, setConversionRateMass] = useState('');
    const [name, setName] = useState(props?.t?.name ? props.t.name : "");
    const [num, setNum] = useState(props?.t?.num ? props.t.num : "");
    const [entityType, setEntityType] = useState(props?.t?.entityType ? props.t.entityType : "");
    const [target, setTarget] = useState(props?.t?.target ? props.t.target : "");
    const [currencyType, setCurencyType] = useState(props?.t?.currencyType ? props.t.currencyType : "");
    const [conversionRate, setConversionRate] = useState(props?.t?.conversionRate ? props.t.conversionRate : "");
    const [conditions, setConditions] = useState(props?.t?.conditions ? props.t.conditions : "");
    const [fnum, setFnum] = useState(false);
    const [fname, setFname] = useState(false);

    useEffect(() => {
        if (name !== "" && num !== "" && target !== "" && conversionRate !== "" && entityType !== "" && currencyType !== "" && !flagName && !flagNum && !flagTarget && !flagConversionRate)
            setHasError(false)
        else
            setHasError(true)
    }, [name, num, target, conversionRate, entityType, currencyType]);



    const saveOrUpdate = (name, num, target, conversionRate, entityType, currencyType, conditions) => {

        if (hasError) {
            if (name === "") { setFlagName(true) };
            if (num === "") { setFlagNum(true) };
            if (target === "") { setFlagTarget(true) };
            if (conversionRate === "") { setFlagConversionRate(true) };
            if (entityType === "") { setFlagEntityType(true) };
            if (currencyType === "") setFlagCurrencyType(true);
        }
        else {
            var obj = { "name": name, "num": num, "target": target, "conversionRate": conversionRate, "entityType": entityType, "currencyType": currencyType, "conditions": conditions };
            let arr = JSON.parse(localStorage.getItem("arr") || "[]");
            if (!props.t) {
                arr.push(obj);
                localStorage.setItem("arr", JSON.stringify(arr));
                props.setShow(false);
                props.setArr(arr);

            }
            else {
                arr[props.index] = obj;
                localStorage.setItem("arr", JSON.stringify(arr));
                props.setArr(arr);
                props.setEdit(false);
            }
        }
    }
    function isLetterInEnglish() {
        let regLetter = /^[a-zA-Z\u0590-\u05FF\u200f\u200e ]+$/i
        return (!regLetter.test(name))
    }

    function isDecimalNumber() {
        let regNumber = /^[0-9]*(\.[0-9]+)?$/
        return (!regNumber.test(num))
    }

    function cleanForm() {
        setName(""); setNum(""); setConditions(""); setTarget(""); setConversionRate(""); setEntityType(""); setCurencyType("")
    }

    return (<div className="box">
        <Box className="input"
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '24ch' },
            }}
            // noValidate
            autoComplete="off"

        >
            <div>{props?.t ? <h3> </h3> : <h3>  ?????????? ?????????? ???? ?????????? :</h3>}

                <TextField className="f"
                    onChange={(e) => {
                        if (props?.edit || !props.t) {
                            setName(e.target.value);
                            setFlagName(false);
                        }
                    }}
                    error={flagName}
                    id="standard-error-helper-text"
                    label="???? ???????????? ?????????????? ???????? *"
                    onBlur={() => {
                        if (isLetterInEnglish()) {
                            setFname(true);
                            setFlagName(true);
                        }
                        else {
                            setFname(false);
                        }
                    }}
                    helperText={flagName && fname ? "!???? ?????????? ???????? ????????" : flagName ? "?????? ????????!" : ""}
                    value={name}
                />


                <TextField
                    onChange={(e) => {
                        if (props?.edit || !props.t) {
                            setNum(e.target.value);
                            setFlagNum(false);

                        }
                    }}
                    error={flagNum}

                    id="standard-error-helper-text"
                    label="???????? ???????????? ?????? *"
                    onBlur={() => {
                        if (isDecimalNumber()) {
                            setFnum(true);
                            setFlagNum(true);
                        }
                        else {
                            setFnum(false);
                        }
                    }}
                    helperText={flagNum && fnum ? "!???????? ???????????? ???????? ????????" : flagNum ? "?????? ????????!" : ""}

                    value={num}
                />


                <FormControl className="f" sx={{ m: 1, width: '30ch' }}>

                    <InputLabel id="demo-simple-select-label"> ?????? ?????????? ???????? *</InputLabel>
                    <Select
                        error={flagEntityType}

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={entityType}
                        label=" ?????? ?????????? ???????? * "
                        onChange={(e) => {
                            if (props?.edit || !props.t) {
                                setEntityType(e.target.value);
                                setFlagEntityType(false);
                            }
                        }}
                    >

                        <MenuItem value={"association"}>??????????</MenuItem>
                        <MenuItem value={"Society"}>????????/</MenuItem>
                        <MenuItem value={"MLCR"}>????"????/</MenuItem>
                        <MenuItem value={"Financial_insution"}>???????? ????????/</MenuItem>
                        <MenuItem value={"Private"}>????????</MenuItem>
                    </Select>
                    <FormHelperText>{flagEntityType ? "?????? ????????!" : ""}</FormHelperText>
                </FormControl>
                <FormControl
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '82ch' },
                    }} >

                    <TextField
                        error={flagTarget}
                        label="?????????? ????????????*"
                        value={target}
                        onChange={(e) => {
                            if (props?.edit || !props.t) {
                                setTarget(e.target.value);
                                setFlagTarget(false)
                            }
                        }}

                        helperText={flagTarget ? "?????? ????????!" : ""}
                    />
                </FormControl>

                <FormControl fullWidth
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '82ch' },
                    }} >
                    <TextField
                        id="outlined-password-input"
                        label="???????????? ???????????? "
                        value={conditions}
                        type="text"
                        autoComplete="current-password"
                        onChange={(e) => {
                            setConditions(e.target.value);
                        }}
                    />
                </FormControl>


                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">?????? ???????? *</InputLabel>
                    <Select
                        error={flagCurrencyType}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currencyType}
                        label="?????? ????????"
                        onChange={(e) => {
                            if (props?.edit || !props.t) {
                                setCurencyType(e.target.value);
                                setFlagCurrencyType(false)
                            }
                        }}
                    >
                        <MenuItem value={"USD"}>$ /</MenuItem>
                        <MenuItem value={"NIS"}>??? /</MenuItem>
                        <MenuItem value={"BTC"}>??? /</MenuItem>
                        <MenuItem value={"JPY"}>?? /</MenuItem>
                        <MenuItem value={"EUR"}>???</MenuItem>
                    </Select>
                    <FormHelperText>{flagCurrencyType ? "?????? ????????!" : ""}</FormHelperText>

                </FormControl>

                <TextField

                    error={flagConversionRate}
                    label=" ?????? ?????????? *"
                    value={conversionRate}
                    onChange={(e) => {
                        if (props?.edit || !props.t) {
                            setConversionRate(e.target.value);
                            setFlagConversionRate(false);
                        }
                    }}
                    helperText={conversionRateMass}
                    helperText={flagConversionRate ? "?????? ????????!" : ""}
                />

                <div>
                    <Button class="button" variant="contained" onClick={() => { cleanForm() }} style={{ margin: '2rem ', background: '4848dd', color: 'white', 'borderRadius': '1.5625rem', righr: '0px' }} >??????????</Button>
                    <Button class="button" variant="contained" onClick={() => { saveOrUpdate(name, num, target, conversionRate, entityType, currencyType, conditions) }} style={{ margin: '2rem ', background: 'blue', color: '4848dd', 'borderRadius': '1.5625rem', }}  >??????????</Button>

                </div>
            </div>
        </Box >
    </div>
    );
}
export default FormDonation;