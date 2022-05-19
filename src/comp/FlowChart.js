import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { dbP } from '../firebase/config-prod';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import loading from './img/circle.gif';

am4core.useTheme(am4themes_animated);

class FlowChart extends Component {

    constructor() {
        super();
        this.state = { filter: " ", tall: "600px", show: false };
        this.filterFunction = this.filterFunction.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleKey = this.handleKey.bind(this);
    }

    componentDidMount() {
        am4core.useTheme(am4themes_animated);
        let chart = am4core.create("flowchart", am4charts.SankeyDiagram);
        // chart.responsive.enabled = true;
        chart.paddingRight = 270;
        chart.paddingTop = 25;
        chart.nodes.template.propertyFields.hidden = "disabled";
        chart.nodePadding = 5;

        // var pa = [];
        // dbP.collection("package_list").where('type', '==', 'summary')
        //     .get().then((querySnapshot) => {
        //         var qdoc = querySnapshot.docs.map(doc => doc.data());
        //         var tot = Object.assign(qdoc[0], qdoc[1], qdoc[2], qdoc[3], qdoc[4])
        //         var fil = [];
        //         delete tot['id']
        //         delete tot['type']
        //         // console.log(tot)
        //         for (var key in tot) { fil.push(tot[key]) }
        //         // console.log(fil)
        //         var fin = fil.filter(d => d.package_name.includes('STARBUCK'))
        //         // console.log(fin)

        //         // for(let i = 0; i < qdoc.length; i++){
        //         //  var prodFilter = qdoc[i].filter(d => d.package_name.includes('starbucks')) 
        //         // }

        //     });

        // dbP.collection("package_list").where('type', '==', 'summary').get().then((querySnapshot) => {
        //     var qdoc = querySnapshot.docs.map(doc => doc.data());
        //     for (let i = 0; i < qdoc.length; i++) {
        //         for (var name in qdoc[i]) {
        //             let rec = qdoc[i][name].recipe_record
        //             for (var key in rec) {

        //                 pa.push({
        //                     "value": 1,
        //                     "from": key + " - " + rec[key].recipe_name,
        //                     "to": qdoc[i][name].package_code + " - " + qdoc[i][name].package_name
        //                 })

        //                 if (rec[key].hasOwnProperty('filling_code')) {
        //                     pa.push({
        //                         "value": 1,
        //                         "from": rec[key].filling_code + " - " + rec[key].filling_name,
        //                         "to": key + " - " + rec[key].recipe_name
        //                     })
        //                 } else {
        //                     pa.push({
        //                         "value": 0,
        //                         "disabled": true,
        //                         "from": " ",
        //                         "to": key + " - " + rec[key].recipe_name
        //                     })

        //                 }
        //             }
        //             // console.log(data)
        //             // console.log(pa)
        //             chart.data = pa

        //         }

        //     }
        // }).catch(error => { console.log(error) });
        // console.log(pa)

        chart.dataFields.fromName = "from";
        chart.dataFields.toName = "to";
        chart.dataFields.value = "value";

        chart.links.template.colorMode = "gradient";
        chart.links.template.tooltipText = "{fromName}\n  ↓  \n{toName} [bold][/] \n";
        chart.links.template.tooltipPosition = 'pointer';

        chart.tooltip.label.textAlign = "middle";
        chart.tooltip.label.fill = am4core.color("#000000");
        // chart.nodes.template.nameLabel.label.truncate = true;
        // chart.links.controlPointDistance = 10;
        // nodeTemplate.height = 45;
        // nodeTemplate.stroke = am4core.color("#fff");
        // nodeTemplate.nameLabel.locationX = -0.1;
        // nodeTemplate.nameLabel.label.hideOversized = false;

        let nodeTemplate = chart.nodes.template;
        // nodeTemplate.width = 20;
        // nodeTemplate.propertyFields.width = "width";
        // nodeTemplate.strokeWidth = 2;
        nodeTemplate.adapter.add("dx", function (dx, target) {
            return target.dataItem ? target.dataItem.dataContext.offset || dx : dx;
        })
        nodeTemplate.nameLabel.label.width = 300;
        nodeTemplate.nameLabel.label.wrap = true;
        nodeTemplate.nameLabel.label.fontSize = "12px";
        //---------------Enable click on Sankey Node to redirect to pdf---------------
        nodeTemplate.events.off("hit");
        nodeTemplate.events.on("hit", function (ev) {
            // console.log("clicked on ", ev.target.tooltipDataItem);
            let full = ev.target.name.slice(20, 27);
            let link = "https://firebasestorage.googleapis.com/v0/b/schpi-productionsys-cp2ver1.appspot.com/o/product_spec_pdf%2F" + full + "%2F" + full + ".pdf?alt=media"
            if (full.slice(0, 3) === "SML") {
                // console.log('SML OPEN ')
                window.open(link)
            }
        }, this);
        // nodeTemplate.showTooltipOn = "hover";
        // nodeTemplate.tooltipText=  "{fromName}\n  ↓  \n{toName} \n";
        // nodeTemplate.colorMode = "gradient";

        let hoverState = chart.links.template.states.create("hover");
        hoverState.properties.fillOpacity = 2;
        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    componentDidUpdate(oldProps) {
    }

    filterFunction(sel) {
        this.setState({ show: true })
        var pa = [];
        dbP.collection("package_list").where('type', '==', 'summary')
            .get().then((querySnapshot) => {
                var qdoc = querySnapshot.docs.map(doc => doc.data());
                var tot = Object.assign(qdoc[0], qdoc[1], qdoc[2], qdoc[3], qdoc[4])
                var fil = [];
                var fin;
                delete tot['id']
                delete tot['type']
                // console.log(tot)
                for (let tkey in tot) { fil.push(tot[tkey]) }
                // console.log(fil)

                if (sel === "Q") {
                    fin = fil.filter(d => d['package_name'].includes(this.state.filter))
                    // console.log(fin)
                } else if (sel === "S") {
                    fin = fil.filter(d => {
                        let rec = d.recipe_record
                        let rec_key = Object.keys(rec)
                        // console.log(rec_key)
                        if (rec_key.length === 1) {
                            let test = rec[rec_key].recipe_name.includes(this.state.filter)
                            return test
                        } else if (rec_key.length > 1) {
                            for (let i = 0; i < rec_key.length; i++) {
                                let test = rec[rec_key[i]]['recipe_name'].includes(this.state.filter)
                                return test
                                // console.log(test)
                            }
                        }
                    })
                    // console.log(fin)
                } else {
                    fin = fil.filter(d => {
                        let rec = d.recipe_record
                        let rec_key = Object.keys(rec)
                        // console.log(rec_key)

                        if (rec_key.length === 1) {
                            if (rec[rec_key].hasOwnProperty('filling_code')) {
                                let test = rec[rec_key].filling_name.includes(this.state.filter)
                                return test
                            }
                        } else if (rec_key.length > 1) {
                            for (let i = 0; i < rec_key.length; i++) {
                                if (rec[rec_key[i]].hasOwnProperty('filling_code')) {
                                    let test = rec[rec_key[i]]['filling_name'].includes(this.state.filter)
                                    return test
                                }
                            }
                        }
                    })
                    // console.log(fin)
                }

                for (let i = 0; i < fin.length; i++) {
                    let rec = fin[i].recipe_record
                    for (var key in rec) {

                        pa.push({
                            "value": 1,
                            "from": key + " - " + rec[key].recipe_name,
                            "to": fin[i].package_code + " - " + fin[i].package_name
                        })

                        if (rec[key].hasOwnProperty('filling_code')) {
                            pa.push({
                                "value": 1,
                                "from": rec[key].filling_code + " - " + rec[key].filling_name,
                                "to": key + " - " + rec[key].recipe_name
                            })
                        } else {
                            pa.push({
                                "value": 0,
                                "disabled": true,
                                "from": " ",
                                "to": key + " - " + rec[key].recipe_name
                            })

                        }
                    }
                }
                // console.log(pa)
                let paSerial = pa.map(e => JSON.stringify(e));
                let newSet = new Set(paSerial)
                let newPa = [...newSet]
                let paDisp = newPa.map(e => JSON.parse(e));
                this.setState({ tall: paDisp.length * 20 + "px", show: false });
                const MySwal = withReactContent(Swal)
                if (paDisp.length < 1) {
                    MySwal.fire({
                        title: <p>Product Flowchart</p>,
                        footer: 'Flowchart',
                        confirmButtonColor: '#2B4355',
                        didOpen: () => {
                            MySwal.clickConfirm()
                        }
                    }).then(() => {
                        return MySwal.fire(
                            '😕',
                            'No Results',
                            'warning')
                    })
                }
                this.chart.data = paDisp

            });

    }

    handleText(e) {
        this.setState({ filter: e.target.value.toUpperCase() });
    }

    handleKey(e, A) {
        if (e.key === 'Enter') {
            this.filterFunction(A)
        }
    }

    render() {
        return (
            <Container>
                <Row className="my-3">
                    <h5 className="my-3 mx-auto">Product Flowchart</h5>
                </Row>
                <Row >
                    <Col>
                        <input type="text" placeholder="Search HCK..." onChange={this.handleText}
                            onKeyDown={(e) => this.handleKey(e, 'H')}
                            className='d-inline-block' />
                        <Button variant="danger" size="sm" onClick={() => this.filterFunction('H')}
                            className='ml-1 d-inline-block align-bottom'> Go
                        </Button>
                    </Col>
                    <Col>
                        <input type="text" placeholder="Search SML..." onChange={this.handleText}
                            onKeyDown={(e) => this.handleKey(e, 'S')}
                            className='d-inline-block align-center' />
                        <Button variant="success" size="sm" onClick={() => this.filterFunction('S')}
                            className='ml-1 d-inline-block align-bottom'> Go
                        </Button>
                    </Col>
                    <Col >
                        <input type="text" placeholder="Search Q_SML..." onChange={this.handleText}
                            onKeyDown={(e) => this.handleKey(e, 'Q')}
                            className='d-inline-block align-center' />
                        <Button variant="primary" size="sm" onClick={() => this.filterFunction('Q')}
                            className='ml-1 d-inline-block align-bottom'> Go
                        </Button>
                    </Col>
                </Row>



                <Row className="my-4">
                    {this.state.show ? <div className = 'mx-auto mt-4'><h4>
                        <img src={loading}
                            width="64"
                            height="64"
                            alt='loading'
                        />
                    </h4></div> : null}
                    <div id="flowchart" style={{ width: "100%", height: this.state.tall }}></div>
                </Row>
                <Row className=" mb-4"></Row>
            </Container>
        );
    }
}

export default FlowChart;