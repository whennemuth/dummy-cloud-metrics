import React, { Component } from 'react';
import './css/index.css';

class DummyMetrics extends Component {

    render() {
        return <DummyMetric />
    }
}

// RESUME NEXT: Finish this.
class DummyMetric extends Component {

    validatePercent = (event) => {
         alert(event.keyCode);
    }

    render() {

        return (
            <div>
                Make this EC2 instance report a lie to cloudwatch about its CPU utilization metrics.<br/>
                Percent CPU Utilization:
                <input type='text' onChange={this.validatePercent} />
            </div>
        )
    }
}

export default DummyMetrics