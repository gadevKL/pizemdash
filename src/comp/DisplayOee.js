import useDisplayOee from '../hooks/useDisplayOee.js';
import { Row } from 'react-bootstrap';


const DisplayOEE = (props) => {

  // console.log(props.page)
  const { total, ava, perf, qual, prodname, ctotal, cava, cperf, cqual } = useDisplayOee(props)

  return (
    <div >
      <div>
        <div className="d-inline-block mr-3 mt-1">PP/ {props.page.production_order}</div>
        <small className="d-inline-block mb-3 text-muted">{prodname}</small>
      </div>
      <Row>
        <div className="d-inline-block single-chart my-auto">
          <svg viewBox="0 0 36 45" className="circular-chart blue">
            <path className="circle-bg" d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            <path className="circle" strokeDasharray={ctotal} id="round" d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            <text x="18" y="20.35" className="percentage" id="total_oee_disp">{total}</text>
            <text x="18" y="44" className="total">Total OEE</text>
          </svg>
        </div>

        <div className="d-inline-block single-chart my-auto">
          <svg viewBox="0 0 36 45" className="circular-chart green">
            <path className="circle-bg" d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            <path className="circle" strokeDasharray={cava} id="round" d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            <text x="18" y="20.35" className="percentage">{ava}</text>
            <text x="18" y="44" className="label">Availability</text>
          </svg>
        </div>

        <div className="d-inline-block single-chart my-auto">
          <svg viewBox="0 0 36 45" className="circular-chart orange">
            <path className="circle-bg" d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            <path className="circle" strokeDasharray={cperf} id="round" d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            <text x="18" y="20.35" className="percentage" >{perf}</text>
            <text x="18" y="44" className="label">Performance</text>
          </svg>
        </div>

        <div className="d-inline-block single-chart my-auto">
          <svg viewBox="0 0 36 45" className="circular-chart magenta">
            <path className="circle-bg" d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            <path className="circle" strokeDasharray={cqual} id="round" d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            <text x="18" y="20.35" className="percentage" id="total_oee_disp">{qual}</text>
            <text x="18" y="44" className="label">Quality</text>

          </svg>
        </div>
      </Row>
    </div>
  )
}

export default DisplayOEE;