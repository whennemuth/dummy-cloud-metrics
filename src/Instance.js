import React, { Component } from 'react';
import './css/index.css';
import { ContainerInstanceLookup } from './Lookup'
import TabStrip from './Tab'
import JsonToTable from './TabularView'
import Metrics from './Metric'

const Heading = ({title}) => { return (<div className="separator">{title}</div>) };

class Instances extends Component {

    constructor(props) {
        super(props)
        this.state = { tabdefs: []} 
        let instances = (new ContainerInstanceLookup()).getData({
            dummy: true,
            query: null
        })
    
        // The first tab is for fake metric substitutions (each remaining tab represents its own container instance)
        this.state.tabdefs.push({
            data:"metrics-config",
            label:"CONFIG",
            active:true
        })

        instances.forEach(inst => {
            this.state.tabdefs.push({ 
                data:inst, 
                label:inst.ec2InstanceId,
                active:false 
            })
        });
    }

    switchTabs = (index) => {
        let defs = this.state.tabdefs.map((def, idx) => {
            return {
                data : def.data,
                label : def.label,
                active : (idx === index)
            }
        })
        this.setState({tabdefs: defs})
        return defs
    }

    render() {
        let currentTab = null;
        this.state.tabdefs.forEach(tabdef => {
            if(tabdef.active) {
                // All tabs except for the first are for container instance information
                if(tabdef.data == "metrics-config") {
                    currentTab = {
                        heading: (<Heading title='Dummy Metrics for the Cluster' />),
                        content: () => {
                            return <Metrics />
                        }
                    }
                }
                else {
                    currentTab = {
                        heading: (<Heading title={"Container Instance ID: " + tabdef.data.ec2InstanceId} />),
                        content: () => {
                            return <Instance data={tabdef.data} />
                        }
                    }
                }
            }
        });
        
        return (
            <div className='instance'>
                <TabStrip 
                    defaultTabdefs={this.state.tabdefs} 
                    refreshTabdefs={this.switchTabs} 
                    getTabLabel={this.getTabLabel} />

                { currentTab.heading } 

                { currentTab.content() }
            </div>
        )        
    }
}

class Instance extends Component {
    
    render() {
        let json = this.props.data
        return (
            <div className="instanceinfo">
                <JsonToTable json={json} />                
            </div>
        )
    }
}

export default Instances