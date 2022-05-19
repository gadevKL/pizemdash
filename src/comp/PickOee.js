import { Card, Row, Col, DropdownButton } from 'react-bootstrap';
import DisplayOEE from './DisplayOee';
import usePickOee from '../hooks/usePickOee.js';


const PickOEE = (props) => {
    // let today = moment(props.date).format("YYYY-MM-DD")
    var nextDay = new Date(Number(props.date));
    nextDay.setDate(props.date.getDate() + 1);
    const { val, page } = usePickOee(props);

    return (
        <div>
            <Row>
                <Col sm={12}>
                    <Card className="my-2">
                        <div className="card-body">
                            <h5 className="card-title d-inline-block align-middle mr-4">
                                Overall Equipment Effectiveness </h5>
                            <div className="d-inline-block align-top">
                                <DropdownButton
                                    className="up"
                                    id="dropdown-pp"
                                    title="Production No."
                                    key="dropdown"
                                    size="sm"
                                    variant="light">
                                    {val}
                                </DropdownButton>
                            </div>
                            <DisplayOEE page={page} />
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col sm={12}>
                    <Card className="my-2">
                        <div className="card-body mt-1 text-center smol">
                            <Row>
                                <Col >Lead 👨‍💼  <h6 className="mt-1">{page.Lead_by}</h6> </Col>
                                <Col >Manpower 👷 <h6 className="mt-1">{page.Manpower}</h6> </Col>
                                <Col >Total Output 🥧<h6 className="mt-1">{page.Actual_output}</h6> </Col>
                                <Col >Production Time ⌛ <h6 className="mt-1">{page.Actual_total_productive_time}</h6> </Col>
                                <Col >Output (pcs/hr) ⏱<h6 className="mt-1">{page.Line_output}</h6></Col>

                            </Row>

                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );


}

export default PickOEE;