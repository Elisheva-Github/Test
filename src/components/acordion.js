import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import FormDonation from "./formDonation"
import "./style.css";

export default function CustomizedAccordions(props) {
    const [expanded, setExpanded] = React.useState('panel1');
    const [edit, setEdit] = useState(false);

    function editItem(e) {
        e.stopPropagation();
        setEdit(true);
    }
    function deleteItem(e, index) {
        e.stopPropagation();
        const a = JSON.parse(localStorage.getItem("arr"));
        a.splice(index, 1);
        localStorage.setItem("arr", JSON.stringify(a));
        props.setArr(a);
    }


    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            <div>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary id="panel2d-header">
                        <Typography className="accordion">
                            | <IconButton className="icon" aria-label="delete" size="large" onClick={(event) => deleteItem(event, props.index)} >
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton id="CreateIcon" size="large">
                                <CreateIcon onClick={(e) => editItem(e)} fontSize="inherit" />
                            </IconButton>
                            <div className="span">   <b>{props.t.name}   </b>₪{props.t.num} </div>
                        </Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormDonation className="d" t={props.t} edit={edit} setEdit={setEdit} index={props.index} setArr={props.setArr}></FormDonation>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>

        </div >
    );
}


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(255, 255, 255, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
