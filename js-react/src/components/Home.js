import React from 'react'
import * as bs from 'react-bootstrap'
import { Formik, Form, Field} from 'formik'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Slider from 'calcite-react/Slider'
import { FormHelperText } from 'calcite-react/Form'


export default function Home(props) {    
    //useHistory react stuff
    let history = useHistory();
    return (
        <Formik
            initialValues={{
              title: '',
              roomtype: 'Private Room',
              neighborhood: 'Manhatten',
              availability: 1,
              minimumNights: 1,
              reviews: 0,
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                const errors = {}
                if(!values.title) {
                    errors.title = 'You must insert a title for your rental property'
                }
                if(!values.roomtype) {
                    errors.roomtype = 'You must insert a room type for your rental property'
                }
                if(!values.neighborhood) {
                    errors.neighborhood = 'You must insert a neighborhood for your rental property'
                }
                if(!values.availability) {
                    errors.availability = 'You must select availability for your rental property'
                }
                if(!values.minimumNights) {
                    errors.minimumNights = 'You must select a minimum # of nights to book your rental property'
                }
                if(!values.reviews) {
                    errors.reviews = 'You must set a number of reviews that your rental property has'
                }

                return errors
            }}
            onSubmit={async (values) => {
                let PostURL = 'http://localhost:8000/api/predict/' // this is for local testing. Just comment and uncomment these lines as needed.
                // let PostURL = '/api/predict/' // this is for production/deployment
                let apiResponse = await axios.post(PostURL, {
                    'title': values.title,
                    'room_type': values.roomtype,
                    'neighbourhood_group': values.neighborhood,
                    'availability_365': values.availability,
                    'minimum_nights': values.minimumNights,
                    'number_of_reviews': values.reviews,
                })
                const azureResponse = JSON.parse(apiResponse.data)
                const scoredLabelsIndex = azureResponse.Results.output1.value.ColumnNames.indexOf('Scored Labels')
                if(scoredLabelsIndex === -1) {
                    history.push({
                        pathname: '/error',
                        state: { error: 'Scored Labels not found in the API response from Azure' }
                    })
                    return;
                }
                const predictedPercent = azureResponse.Results.output1.value.Values[0][scoredLabelsIndex]
                history.push({
                    pathname: '/prediction',
                    calculatedPercent: predictedPercent,
                    goal: values.goal,
                });
                return;
            }}
        >{form => (
            <PaymentForm form={form} />
        )}</Formik>
    )
}

const PaymentForm = props => {
    // corona virus. COVID-19. Help me. Money. Service. Firefighters. Police men. Nurses. Doctors. Healthcare workers.
  return(
    <>
    <div style={{textAlign: 'center'}}>
        <h1>Predict the Value of Your Rental</h1>
    </div>
    {/*console.log("issubmitting 2", props.isSubmitting)*/}
    <bs.Container fluid className="p-0 flex-column">
        <Form>
        <bs.Row noGutters className="flex-grow-0 flex-shrink-0">
                <bs.Col md={12} className="p-1 m-">
                        <div style={{textAlign: 'center'}}>
                            <p>Enter your rental information and we will predict how much money you should charge!</p>
                        </div>
                        <Input title="Title" name="title" type="text" />

                        {/*Dropdown Room Type*/}
                        <bs.Form.Label className="pt-2">Room Type</bs.Form.Label>
                        <Field name="roomtype" as="select" placeholder="Private Room" className="form-control">
                          {optionsRoomType.map((option) =>
                            <option key={option.label} value={option.label}>
                              {option.label}
                            </option>
                            )}
                        </Field>

                        {/*Dropdown Neighborhood*/}
                        <bs.Form.Label className="pt-2">Which neighborhood is your rental in?</bs.Form.Label>
                        <Field name="neighborhood" as="select" placeholder="Manhatten" className="form-control">
                          {optionsNeighborhood.map((option) =>
                            <option key={option.label} value={option.label}>
                              {option.label}
                            </option>
                            )}
                        </Field>

                        {/*Slider availability*/}
                        <bs.Form.Label className="pt-3">Availability (days per year)</bs.Form.Label>
                        <Field component={Slider} name="availability" min={1} max={365} step={1} 
                          className="form-control" 
                          style={{  }}/>
                        <FormHelperText className="text-success">
                        ${props.form.values.goal} <br/>
                        </FormHelperText>

                        {/*Slider minimum nights*/}
                        <bs.Form.Label className="pt-2">What is the minimun nights required for a booking?</bs.Form.Label>
                        <Field component={Slider} name="minimumNights" min={1} max={15} step={1} 
                          className="form-control" />
                        <FormHelperText className="text-success">
                          {props.form.values.daysActive} {props.form.values.daysActive > 1 ? 'night' : 'nights'} <br/><br/>
                        </FormHelperText>

                        <Input title="Number Of Reviews" name="reviews" type="text" />

                        {/*submit button*/}
                        <bs.Button 
                        variant='outline-success' 
                        disabled={props.form.isSubmitting}
                        onClick={() => {
                            props.form.submitForm();
                        }}>
                            <bs.Spinner 
                                animation="border" 
                                role="status"
                                as="span"
                                size="sm"
                                aria-hidden={true}
                                hidden={!props.form.isSubmitting} /> 
                        Predict Your Price</bs.Button>
                </bs.Col>

        </bs.Row>
        </Form>
    </bs.Container>
    </>
    );
}

/**
 * A form input.
 *   props.title - the title that shows above the input box
 *   props.type - the type of input (see React Bootstrap Form.Control)
 *   props.placeholder - placeholder text in the input.
 *   This component is finished and doesn't need additional work.
 */
const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
            {props.title &&
                <bs.Form.Label>{props.title}</bs.Form.Label>
            }
            <bs.Form.Control
                type={props.type}
                placeholder={props.placeholder}
                disabled={rProps.form.isSubmitting}
                {...rProps.field}
            />
            {rProps.meta.touched && rProps.meta.error &&
                <div className="text-danger">{rProps.meta.error}</div>
            }
        </bs.Form.Group>
    )}</Field>
);

const optionsRoomType = [
 {"label": "Private Room"},
 {"label": "Entire Home/Apartment"},
 {"label": "Shared Room"},
 
]

const optionsNeighborhood = [
    {"label": "Brooklyn"},
    {"label": "Manhattan"},
    {"label": "Queens"},
    {"label": "Bronx"},
    {"label": "Staten Island"},
   ]