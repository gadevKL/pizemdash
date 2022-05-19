import { useState, useEffect } from 'react';
import { dbP } from '../firebase/config-prod';
import { db } from '../firebase/config';


const timeConv = (time) => {
    let a = time.split(':'); // split it at the colons
    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    return seconds
}

const useDisplayOee = (props) => {
    const [prodname, setProdname] = useState([]);
    const [total, setTotal] = useState([' - ']);
    const [ava, setAva] = useState([' - ']);
    const [perf, setPerf] = useState([' - ']);
    const [qual, setQuality] = useState([' - ']);
    // console.log(props)
    const [ctotal, setCTotal] = useState(['100 , 100']);
    const [cava, setCAva] = useState([' 100,100 ']);
    const [cperf, setCPerf] = useState([' 100,100 ']);
    const [cqual, setCQuality] = useState([' 100,100 ']);

    useEffect(() => {
        if (props.page === "empty") {
            // console.log('document empty')
            setProdname('None')

            setAva(' N/A ')
            setPerf(' N/A ')
            setQuality(' N/A ')
            setTotal(' N/A ')

            setCTotal()
            setCAva()
            setCPerf()
            setCQuality()

        } else {

            dbP.collection("sl_report_record").where("production_order", "==", props.page.production_order).get()
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        var docs = querySnapshot.docs.map(doc => doc.data());
                        // console.log(docs[0])
                        setProdname(docs[0].product_name)
                        var time = docs[0].Actual_start.slice(0, 10)

                        db.collection('pizem').doc(time).get().then(snap => {
                            let arr = snap.data().data
                            let grad = []
                            var status = false;
                            arr.forEach(function (item) {
                                item.timestamp = new Date(item.timestamp.seconds * 1000)
                            });
                            arr.pop();
                            arr.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                            if (arr[0].power > 69.9) {
                                grad.push({
                                    "delta": arr[0].power,
                                    "timestamp": arr[0].timestamp
                                })
                                status = true
                            }
                            for (let i = 1; i < arr.length - 1; i++) {
                                if (arr[i].power > 69.9 && status === false) {
                                    grad.push({
                                        "power": arr[i].power,
                                        "timestamp": arr[i].timestamp
                                    })
                                    status = true
                                }
                                else if (arr[i].power < 69.9 && status === true) {
                                    status = false
                                    grad.push({
                                        "power": arr[i].power,
                                        "timestamp": arr[i].timestamp
                                    })
                                }
                                else {
                                    continue
                                }
                            }

                            var sum = 0;
                            if (grad.length !== 0) {
                                for (let i = 0; i < grad.length; i = i + 2) {
                                    sum += Math.abs(grad[i].timestamp - grad[i + 1].timestamp)
                                }

                                var toki = sum / 1000;
                                var actual = (grad[grad.length - 1].timestamp - grad[0].timestamp) / 1000

                                let avaDisp = (toki / (timeConv(docs[0].Planned_total_productive_time)))
                                setAva((avaDisp * 100).toFixed(2) + '%')

                                let perfDisp = (docs[0].Actual_output / actual) / (docs[0].Planned_output / (timeConv(docs[0].Planned_total_productive_time)))
                                setPerf((perfDisp * 100).toFixed(2) + '%')

                                let qualDisp = 1
                                // setQuality(qualDisp)
                                setTotal(((avaDisp * perfDisp * qualDisp) * 100).toFixed(2) + "%")

                                setCTotal(((avaDisp * perfDisp * qualDisp) * 100) + ", 100")
                                setCAva(avaDisp * 100 + ", 100")
                                setCPerf(perfDisp * 100 + ", 100")
                                setCQuality(qualDisp * 100 + ", 100")
                            }
                            else {
                                let avaDisp = (timeConv(docs[0].Actual_total_productive_time) / timeConv(docs[0].Planned_total_productive_time))
                                setAva((avaDisp * 100).toFixed(2) + '%')
                                let perfDisp = (docs[0].Actual_output / (timeConv(docs[0].Actual_total_productive_time))) / (docs[0].Planned_output / (timeConv(docs[0].Planned_total_productive_time)))
                                setPerf((perfDisp * 100).toFixed(2) + '%')
                                let qualDisp = 1
                                setTotal(((avaDisp * perfDisp * qualDisp) * 100).toFixed(2) + "%")

                                setCTotal(((avaDisp * perfDisp * qualDisp) * 100) + ", 100")
                                setCAva(avaDisp * 100 + ", 100")
                                setCPerf(perfDisp * 100 + ", 100")
                                setCQuality(qualDisp * 100 + ", 100")
                            }


                        });


                    } else {
                        setProdname('Unavailable')
                    }

                });
        }


    }, [props.page]);

    return { ava, perf, total, qual, prodname, ctotal, cava, cperf, cqual };
}

export default useDisplayOee;