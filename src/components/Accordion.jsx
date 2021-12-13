import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

const AccordionStyled = styled((props) => <Accordion {...props} />)(({ theme }) => ({
  backgroundColor: 'rgb(16, 185, 129)',
}));
const AccordionSummaryStyled = styled((props) => <AccordionSummary {...props} />)(({ theme }) => ({
  backgroundColor: 'rgb(82, 197, 154)',
}));
const AccordionDetailsStyled = styled((props) => <AccordionDetails {...props} />)(({ theme }) => ({
  backgroundColor: 'rgb(247, 247, 247)',
}));

export { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled };
