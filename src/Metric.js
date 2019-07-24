import React, { Component } from 'react';
import './css/index.css';
import { MetricLookup } from './Lookup';
import JsonToTable from './TabularView'

class Metrics extends Component {

    render() {
        return (
            <div className='clusterDummyConfig'>
                              
                <Metric metric='cpu' />

                <Metric metric='memory' />
            </div>
        )
    }
}

class MetricConfig extends Component {

    render() {
        return (
            <div>

            </div>
        )
    }
}


class Metric extends Component {

    render() {
        const { metric } = this.props
        let data = (new MetricLookup()).getData({
            dummy: true,
            query: {
                metricType: metric
            }
        })
        let datapoints = data.Datapoints.map((dp, idx) => {
            let mapified = {}
            mapified[dp.Timestamp] = dp.Average
            return mapified
        })
        
        return(
            <div>
                <div style={{fontWeight:'bold', paddingTop:'5px'}}>{data.Label} Percent</div>
                <JsonToTable json={datapoints} />
            </div>
        )
    }
    
} 

export default Metrics
