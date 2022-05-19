import React, { useState } from "react";
import { Row, Col, Modal, Button, Container } from 'react-bootstrap';
import Kwh from './Kwh';
import PickOEE from './PickOee';
import AmChart from './AmCharts';
import FlowChart from './FlowChart';
import DisplayTL from './DisplayTL.js';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import { dbP } from '../firebase/config-prod';
import moment from 'moment';

const Content = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    startDate.setHours(0, 0, 0, 0);
    let date = "  " + startDate.toLocaleDateString('en-GB') + " "

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ev, setEv] = useState([])

    const handleDate = (arg) => {
        var palette = ['#ff9f00', '#3c9ee5', '#4CC790', '#C70D58', '#7992f3', '#5f74da', '#a36ada', '#257c35', '#fc7e26', '#8b2691', '#940007']
        // console.log(Math.floor(Math.random() * (palette.length)))
        var events = [];
        dbP.collection("sl_report_record").where('start', '>', arg.start).where('start', '<', arg.end)
            .get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    var docs = querySnapshot.docs.map(doc => doc.data());
                    // console.log(docs)product_code: "SML0248"
                    let preval1 = docs.filter(d => d.product_name.includes('PIE'))
                    let preval2 = preval1.filter(d => d.product_code !== "SML0262")
                    let valid = preval2.filter(d => d.product_code !== "SML0248")
                    // console.log(valid)
                    // var test = [];
                    if (valid.length > 0) {
                        valid.forEach(item => events.push({
                            title: item.product_name,
                            color: palette[Math.floor(Math.random() * (palette.length))],
                            resourceId: item.production_order,
                            start: moment(item.Actual_start, 'YYYY-MM-DD ').toDate(),
                            end: moment(item.Actual_end, 'YYYY-MM-DD ').toDate()
                        }))
                        setEv(events)
                        // valid.forEach(item => test.push(item.product_code))
                        // console.log(test)
                    }
                }
            }).catch(error => { console.log(error) });
    }

    const handleClick = (arg) => {
        setShow(false);
        setStartDate(arg.date);
    }

    const handleHover = (arg) => {
        // console.log("PP/" + arg.event._def.extendedProps.resourceId +"\n"+arg.event._def.title)
        // console.log(arg.jsEvent)
        // let disp = "PP/" + arg.event._def.extendedProps.resourceId + "\n" + arg.event._def.title
        // arg.el.setAttribute("data-tip", disp);
        // console.log(arg.el)
    }

    if (props.content === 'O') {
        return (
            <Container>
                <Row className="mt-3">
                    <Col><Button className="px-3" size="" variant="light " onClick={handleShow}>
                        <span className="mr-2">📆</span> {date} </Button>
                    </Col>
                </Row>
                <Kwh date={startDate} />
                <PickOEE date={startDate} />
                <Row>
                    <AmChart date={startDate} />
                </Row>


                <Modal size="xl" show={show} onHide={handleClose} >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <FullCalendar
                            timeZone='local'
                            editable={false}
                            datesSet={handleDate}
                            dateClick={handleClick}
                            contentHeight='auto'
                            events={ev}
                            eventDisplay="block"
                            eventMouseEnter={handleHover}
                            displayEventTime={false}
                            // initialView = "dayGridMonth"
                            plugins={[dayGridPlugin, interactionPlugin]}
                        />
                    </Modal.Body>
                </Modal>
            </Container>
        );
    }
    else if (props.content === 'T') {
        return (
            <DisplayTL />
        )
    }
    else if (props.content === 'F') {
        return (
            <FlowChart />
        )
    }
    else {
        return (
            <FlowChart />
        )
    }
};

export default Content