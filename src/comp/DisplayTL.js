import React, { useState } from "react";
// import { Row, Col, Card } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import resourceTimelinePlugin from '@fullcalendar/resource-timeline' // a plugin
import interactionPlugin from '@fullcalendar/interaction'
import { dbP } from '../firebase/config-prod';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment';


const DisplayTL = () => {
    const MySwal = withReactContent(Swal)

    const [ev, setEv] = useState([])
    const [res, setRes] = useState([{}])

    const handleDate = (arg) => {
        // console.log(arg.start)
        var palette = ['#ff9f00', '#3c9ee5', '#4CC790', '#C70D58']
        // console.log(Math.floor(Math.random() * (palette.length)))
        var resources = [];
        var events = [];
        dbP.collection("sl_report_record").where('start', '>', arg.start).where('start', '<', arg.end)
            .get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    var docs = querySnapshot.docs.map(doc => doc.data());
                    // console.log(docs)
                    let pieFilter = docs.filter(d => d.product_name.includes('PIE'))
                    let tartFilter = docs.filter(d => d.product_name.includes('TART'))
                    let valid = pieFilter.concat(tartFilter)
                    // console.log(valid)
                    if (valid.length > 0) {
                        valid.forEach(item => resources.push({
                            "title": "#" + item.production_order,
                            "id": item.production_order
                        }))
                        setRes(resources)

                        valid.forEach(item => events.push({
                            title: item.product_name,
                            color: palette[Math.floor(Math.random() * (palette.length))],
                            resourceId: item.production_order,
                            start: moment(item.Actual_start,'YYYY-MM-DD hh:mm:ss').toDate(),
                            end: moment(item.Actual_end,'YYYY-MM-DD hh:mm:ss').toDate()
                        }))
                        setEv(events)
                        
                    }
                    else {
                        console.log('No Pie or Tart')
                        setEv([])
                        setRes([])
                        MySwal.fire({
                            title: <p>PiZEM Dashboard</p>,
                            footer: 'PiZEM Dashboard',
                            confirmButtonColor: '#2B4355',
                            didOpen: () => {
                                MySwal.clickConfirm()
                            }
                        }).then(() => {
                            return MySwal.fire(
                                '😕',
                                'No Recorded Production for Pie Machine',
                                'warning')
                        })
                    }
                }
                else {
                    console.log('No planned production')
                    setEv([])
                    setRes([])
                    MySwal.fire({
                        title: <p>PiZEM Dashboard</p>,
                        footer: 'PiZEM Dashboard',
                        confirmButtonColor: '#2B4355',
                        didOpen: () => {
                            MySwal.clickConfirm()
                        }
                    }).then(() => {
                        return MySwal.fire(
                            '😕',
                            'No Recorded Production for Pie Machine',
                            'warning')
                    })
                }
            }).catch(error => { console.log(error) });
    }


    return (
        <div id='calendar' >
            <FullCalendar
                timeZone='local'
                editable={false}
                datesSet={handleDate}
                contentHeight='auto'
                events={ev}
                resources={res}
                resourceAreaHeaderContent='Process'
                schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
                plugins={[resourceTimelinePlugin, interactionPlugin]}
                initialView='resourceTimelineDay'
                aspectRatio='1.5'
                slotDuration='01:00'
                headerToolbar={{
                    left: 'today prev,next',
                    center: 'title',
                    right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
                }}
                views={{
                    resourceTimelineDay: {
                        slotMinWidth: 32,
                        resourceAreaWidth: "13%"
                    },
                    resourceTimelineWeek: {
                        slotMinWidth: 48,
                        resourceAreaWidth: "13%"
                    },
                    resourceTimelineMonth: {
                        slotMinWidth: 48,
                        resourceAreaWidth: "13%"
                    }
                }}

            />
        </div>

    )

};

export default DisplayTL