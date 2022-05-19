import React, { useState } from "react";
// import { Row, Col, Card } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import resourceTimelinePlugin from '@fullcalendar/resource-timeline' // a plugin
import interactionPlugin from '@fullcalendar/interaction'
import { db } from '../firebase/config';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Timeline = () => {
    const MySwal = withReactContent(Swal)

    const [ev, setEv] = useState([])
    const [res, setRes] = useState([{}])

    const handleDate = (arg) => {
        console.log(arg.start)
        var palette = ['#ff9f00', '#3c9ee5', '#4CC790', '#C70D58']
        // let todayStr = new Date().toISOString().replace(/T.*$/, '')
        // console.log(Math.floor(Math.random() * (palette.length)))

        db.collection('pizem_calendar').doc('test').get().then(doc => {
            // console.log(moment(arg.start).format("YYYY-MM-DD"))
            let data = doc.data().events
            let keys = Object.keys(data)
            var realOut = [];

            for (let i = 0; i < keys.length; i++) {
                realOut.push({
                    title: data[keys[i]].title,
                    resourceId: keys[i],
                    color: palette[i],
                    start: new Date(data[keys[i]].start.seconds * 1000),
                    end: new Date(data[keys[i]].end.seconds * 1000),
                })
            }
            setRes(doc.data().resources)
            setEv(realOut)
        })
    }

    const evChange = (info) => {
        // console.log(info)
        let id = info.event._def.resourceIds[0]
        let updateObj = {
            ["events." + id + ".start"]: info.event.start,
            ["events." + id + ".end"]: info.event.end,
        }

        db.collection('pizem_calendar').doc('test').update(updateObj).then(() => {
            console.log("Document successfully updated!");
            console.log(updateObj)
            MySwal.fire({
                title: <p>PiZEM Dashboard</p>,
                footer: 'PiZEM Dashboard',
                confirmButtonColor: '#2B4355',
                didOpen: () => {
                    MySwal.clickConfirm()
                }
            }).then(() => {
                return MySwal.fire(
                    'Changes saved!',
                    'Changes to Process ' + info.event._def.resourceIds[0] + ' saved to Firestore',
                    'success')
            })
        });
    }

    return (
        <div id='calendar' >
            <FullCalendar
                timeZone='local'
                eventDrop={evChange}
                eventResize={evChange}
                editable={true}
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
                    right: 'resourceTimelineDay,resourceTimelineWeek'
                }}
                views={{
                    resourceTimelineDay: {
                        slotMinWidth: 32,
                        resourceAreaWidth: "13%"
                    },
                    resourceTimelineWeek: {
                        slotMinWidth: 48,
                        resourceAreaWidth: "13%"
                    }
                }}

            />
        </div>

    )

};

export default Timeline