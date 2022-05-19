import { useState, useEffect } from 'react';
import { dbP } from '../firebase/config-prod';
import { Dropdown } from 'react-bootstrap';

const usePickOee = (props) => {
    const [val, setVal] = useState([<Dropdown.Item key="NaN"> None </Dropdown.Item>]);
    const [page, setPage] = useState('empty');

    useEffect(() => {

        var nextDay = new Date(Number(props.date));
        nextDay.setDate(props.date.getDate() + 1);

        var final = [];

        dbP.collection("sl_report_record").where('start', '>', props.date).where('start', '<', nextDay)
            .get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    var docs = querySnapshot.docs.map(doc => doc.data());
                    console.log(docs)
                    let pieFilter = docs.filter(d => d.product_name.includes('PIE'))
                    let tartFilter = docs.filter(d => d.product_name.includes('TART'))
                    let valid = pieFilter.concat(tartFilter)
                    if (valid.length > 0) {
                        // console.log(valid)
                        valid.forEach(item => final.push(
                            <Dropdown.Item key={item.production_order}
                                onClick={() => setPage(item)}>
                                {item.production_order} : {item.product_name}
                            </Dropdown.Item>
                        ))
                        setPage(valid[0])
                        setVal(final)
                    }
                    else {
                        setPage('empty')
                        setVal(
                            <Dropdown.Item key="NaN" >
                                No task
                            </Dropdown.Item>
                        )

                    }
                }
                else {
                    console.log('No match')
                    setPage('empty')
                    setVal(
                        <Dropdown.Item key="NaN" >
                            No task
                        </Dropdown.Item>
                    )
                }
            }).catch(error => { console.log(error) });


    }, [props.date]);

    return { val, page };
}

export default usePickOee;