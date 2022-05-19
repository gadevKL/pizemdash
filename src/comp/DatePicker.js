import React, { useState } from "react";
import { Container, Button } from 'react-bootstrap';
import logo from './img/dash2.png';
import Navbar from 'react-bootstrap/Navbar';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import HamburgerMenu from "react-hamburger-menu";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import './DatePicker.css';

import Content from './Content';

const PickDate = () => {
  // const [startDate, setStartDate] = useState(new Date());
  // startDate.setHours(0, 0, 0, 0);
  const [con, setCon] = useState('O')
  // console.log(con)

  const [drawer, setDrawer] = useState(false)
  const handleClick = () => {
    setDrawer(prevDrawer => !prevDrawer)
    // console.log(drawer)
  }

  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand>
          <div className='d-inline-block align-center ml-2 mr-3'>
            <HamburgerMenu isOpen={drawer}
              menuClicked={handleClick}
              width={16}
              height={13}
              strokeWidth={1}
              rotate={0}
              color='black'
              borderRadius={0}
              animationDuration={0.75}
            />
          </div>
          <img
            src={logo}
            width="32"
            height="32"
            className="d-inline-block align-top"
            alt='GA logo'
          />
          <div className='d-inline-block align-top tit'>
            Pi
          </div>
          <div className='d-inline-block align-top qs'>
            e Machine Dashboard
          </div>
        </Navbar.Brand>
        {/* <Navbar.Collapse className="qs justify-content-end">
          <img
            onClick={() => { setStartDate(new Date()) }}
            src={calendar}
            width="18"
            height="18"
            className="d-inline-block align-top mr-2"
            alt='GA logo'
          />
          <div className="d-inline-block align-top mr-2 pr-2">
            <DatePicker selected={startDate}
              onChange={(date) => { setStartDate(date) }}
            />
          </div>
        </Navbar.Collapse> */}
      </Navbar>

      <Drawer open={drawer} onClose={handleClick} direction='left' duration='450' size ={266}>
        <div className="px-4 py-4 qs">

          <img
            src={logo}
            width="32"
            height="32"
            className="d-inline-block align-top"
            alt='GA logo'
          />
          <div className="d-inline-block align-center pt-1 ml-2">Menu</div>
          <div className='d-inline-block align-center py-2 mb-4 pull-right'>
            <HamburgerMenu
              isOpen={drawer}
              menuClicked={handleClick}
              width={16}
              height={13}
              strokeWidth={1}
              rotate={0}
              color='black'
              borderRadius={0}
              animationDuration={0.3}
            />
          </div>

          <Button className="mt-4 btn-block text-left" variant="light" size="md" onClick={() => { setCon('O'); setDrawer(false) }}>
            <span className="mr-2">🖥️</span> Overview
          </Button>
          <Button className="my-2 btn-block text-left" variant="light" size="md" onClick={() => { setCon('T'); setDrawer(false) }}>
            <span className="mr-2">🕗</span>Timeline
          </Button>
          <Button className="my-2 btn-block text-left" variant="light" size="md" onClick={() => { setCon('F'); setDrawer(false) }}>
            <span className="mr-2">📊</span>Flowchart
          </Button>
          <Button className="my-2 btn-block text-left" variant="light" size="md" onClick={() => { window.open('https://schpi-pie-production-plans.web.app/'); setDrawer(false) }}>
            <span className="mr-2">🥧</span>Production Plan
          </Button>
          <Button className="my-2 btn-block text-left" variant="light" size="md" onClick={() => { window.open('https://schpi-pie-production-monitor.web.app/'); setDrawer(false) }}>
            <span className="mr-2">📺</span>Production Monitor
          </Button>
          <Button className="my-2 btn-block text-left" variant="light" size="md" onClick={() => { window.open('https://hot-kitchen-record-v3.web.app/'); setDrawer(false) }}>
            <span className="mr-2">🥘</span>Hot Kitchen 
          </Button>
          <Button className="my-2 btn-block text-left" variant="light" size="md" onClick={() => { window.open('http://sydneycakehouse.no-ip.biz:12927/production/dashboard.php'); setDrawer(false) }}>
            <span className="mr-2">📦</span>WMS
          </Button>

          <div className="px-4 py-4 fixed-bottom qsl">by GoAutomate</div>

        </div>
      </Drawer>

      <Container>
        <Content content={con} />
      </Container>

    </div>

  );
};

export default PickDate;