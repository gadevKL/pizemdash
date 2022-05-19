import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const useFirestore = (today) => {
  const [kwh, setKwh] = useState([]);
  const [power, setPower] = useState([]);
  const [cash, setCash] = useState([]);
  const [pf, setPf] = useState([]);

  useEffect(() => {
    db.collection('pizem').doc(today).get().then((doc) => {
      // let dateNow = moment().format("YYYY-MM-DD")
      if (doc.exists) {
        // console.log(today)
        db.collection('pizem').doc(today).get().then(snap => {
          let data = snap.data().data
          data.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));
          let len = data.length
          let delta = data[len - 1].energy - data[0].energy
          setKwh(delta.toFixed(3));
          setPower(data[len - 1].power);
          setCash((delta * 0.472).toFixed(2))
          setPf(data[len - 1].pf)
        });

      }
      else {
        // alert("No document for selected date.");
        MySwal.fire({
          title: <p>PiZEM Dashboard</p>,
          footer: 'PiZEM Dashboard',
          confirmButtonColor: '#2B4355',
          didOpen: () => {
            MySwal.clickConfirm()
          }
        }).then(() => {
          return MySwal.fire(
            'Error!',
            "No data for selected date.",
            'error')
        })
        console.log('No data recorded for selected date')
        setKwh(" - ");
        setPower(" - ");
        setCash(" - ")
        setPf(" - ")
      }
    });
  }, [today]);

  // return () => unsub();
  return { kwh, power, cash, pf };
}

export default useFirestore;