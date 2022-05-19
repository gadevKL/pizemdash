import { useState, useEffect } from 'react';
import { db } from '../firebase/config';

const useToday = (today) => {
  const [kwht, setKwh] = useState([]);
  const [powert, setPower] = useState([]);
  const [casht, setCash] = useState([]);
  const [pft, setPf] = useState([]);


  useEffect(() => {
    db.collection('pizem').doc(today).get().then((doc)=>{
      if(doc.exists){
        // console.log('doc exists')
        const unsub = db.collection('pizem').doc(today).onSnapshot(snap => {
          let data = snap.data().data
          data.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));
          let len = data.length
          let delta = data[len - 1].energy - data[0].energy
          setKwh(delta.toFixed(3));
          setPower(data[len - 1].power);
          setCash((delta * 0.472).toFixed(2))
          setPf(data[len - 1].pf)
          // let temp = snap.data().data
          // let test = data.filter(d => d.power > 69);
          // test.filter(d => d.timestamp )
          // arr1 = data.filter(d => d.timestamp > );

          // setFull((test.length / 1440).toFixed(2))
          // setBat("" + (test.length / 1440).toFixed(2) + " ,100")
          return () => unsub();

        });

        return () => unsub();

      }
      else{
        alert("No document for selected date.");
        console.log('No document for selected date')
        setKwh("NaN");
        setPower("NaN");
        setCash("NaN")
        setPf("NaN")
      }
    });
    // return () => unsub();
  }, [today]);

  return { kwht, powert, casht, pft };
}

export default useToday;