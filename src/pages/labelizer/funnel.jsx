import React from 'react';
import { axios_ } from '../../components/baseRequest';
import { useHistory } from "react-router-dom";

import Choices from './funnelComponents/choices.jsx';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Select Source', 'Select Tags', 'Start Labeling'];
}

function DisplayedStepContent(props) {
  const {
    step,
    checkedSources,
    setCheckedSources,
    checkedTags,
    setCheckedTags
  } = props;
  const [sources, setSources] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    const loadSources = async () => {
      const source_response = await axios_.get('/labelizer/sources');
      setSources(source_response.data)
    }
    const loadTags = async () => {
      const tag_response = await axios_.get('/labelizer/tags');
      setTags(tag_response.data)
    }
    if (sources.length === 0 && step === 0){
      loadSources()
    }
    if (tags.length === 0 && step === 1){
      loadTags()
    }
  }, [sources, tags, step])

  switch (step) {
    case 0:
      return <Choices
        choices={sources}
        checked={checkedSources}
        setChecked={setCheckedSources}
      />;
    case 1:
      return <Choices
        choices={tags}
        checked={checkedTags}
        setChecked={setCheckedTags}
      />;
    case 2:
      return `Cool - settings correct?! Let's start!`;
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper(props) {
  const {
    checkedSources,
    setCheckedSources,
    checkedTags,
    setCheckedTags
  } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const history = useHistory();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep + 1 === steps.length) {
      const sources = checkedSources.map(source => `sources=${source}`)
      const tags = checkedTags.map(tag => `tags=${tag}`)
      history.push(`/labelizer?${sources.join("&")}&${tags.join("&")}`)
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <DisplayedStepContent
                step={index}
                checkedSources={checkedSources}
                setCheckedSources={setCheckedSources}
                checkedTags={checkedTags}
                setCheckedTags={setCheckedTags}
              />
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}