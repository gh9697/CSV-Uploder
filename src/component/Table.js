import React, { Component } from 'react';
import {CSVLink} from 'react-csv';
import HeadSelector from './FieldSelection';
import './Table.css';

const buttonRef = React.createRef()

class Table extends Component {
    constructor(props){ 
        super(props);
        this.state = { 
            exportdata : [],
        }
    } 


    renderTableData = (object) => {
        return object.data.map((data,index) => {
            return  <td key={index}>{data}</td>;
        });
    }

    handleClick= (e) => {
        if(e.target.nodeName === 'INPUT' && e.target.parentElement.nodeName === 'TH'){
            let tbody = document.getElementsByTagName('tbody')[0],
            checks = [...tbody.getElementsByTagName('input')],
            rows = [...tbody.children];
            rows.forEach((it)=>{
                it.classList.remove('selection');
            });
            
            if(e.target.checked){
               checks.forEach((item,index)=>{
                    item.checked = true;
                    rows[index].classList.add('selection');
               });              
            }
            else{
               checks.forEach((item,index)=>{
                  item.checked = false;
                 rows[index].classList.remove('selection');
               });
            }  
        }
    }

    handleSingleCheck = (event) => {
        if(event.shiftKey){
            event.target.parentElement.parentElement.classList.toggle('selection');
        }
        event.target.parentElement.parentElement.classList.toggle('selection');
    }

    handleDeleteClick= () => {
        if(document.querySelectorAll('.selection').length > 0 ){
            document.querySelectorAll('.selection').forEach(node =>{
                node.style.visibility = 'collapse';
                node.classList.remove('selection');
            });
        }else{
            alert("Please select data to delete.")
        }
    }

    getExportData = async()  => {
        const exportData = []
        const hederValue = []
        document.querySelectorAll('select').forEach(node =>{
            hederValue.push(node.value);
        })
        exportData.push(hederValue);
        document.querySelectorAll('.selection').forEach(node =>{
            if(node.style.visibility !== "collapse"){
                const line = [];
                node.querySelectorAll("td").forEach( subnode => {
                    line.push(subnode.innerText)
                });
                line.shift();
                exportData.push(line)
            }
        });
        this.setState({ exportdata : exportData });
        return exportData;
    }

    handleExportClick = async () => {
        const result = await this.getExportData()
        if(result && result.length > 1 ){
            buttonRef.current.link.click()
        }else{
            alert("Please select data to export.")
        }
        this.setState({ exportdata : [] });
    }

    filter = (row,filter) => {
        var text = row.textContent.toLowerCase();
        row.style.display = text.indexOf(filter.toLowerCase()) === -1 ? 'none': 'table-row';
    }

    handleFilter = (input) => {
        let tbody = document.getElementsByTagName('tbody')[0],
        rows = [...tbody.children];
        rows.forEach((it)=>{
            this.filter(it, input.target.value);
        });
    }

    render() {
        return (
            <div>
                <div className="tasks">
                    <input type="search" className="table-filter" data-table="order-table" 
                        placeholder="Filter" onChange={(input) => this.handleFilter(input)}/>
                    <button onClick={this.handleDeleteClick}>Delete Row(s)</button>
                    <button onClick={this.handleExportClick}>Export Row(s)</button>
                    <CSVLink
                        data={this.state.exportdata}
                        filename={'UserData.csv'}
                        className="hidden"
                        ref={buttonRef}
                        target="_blank" 
                    />
                </div>
                <table id="Info">
                    <thead>
                        <tr>
                            <th><input id="select-all" type="checkbox" onClick={(e) => this.handleClick(e)}/></th>
                            {this.props.data && this.props.data[0] &&
                                this.props.data[0].data.map(() => {
                                    return <th><HeadSelector/></th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.data &&   
                            this.props.data.map((value,index) => {
                                return <tr key={index} data-index={index}>
                                        <td><input type="checkbox" onClick={(e) => this.handleSingleCheck(e)}/></td>
                                        {this.renderTableData(value)}
                                    </tr>;
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Table;
